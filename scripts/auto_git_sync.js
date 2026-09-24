/**
 * Auto Git Sync Daemon
 * 
 * Automatically monitors files in the repository, stages changes,
 * creates informative commits, and pushes them to GitHub.
 * 
 * Works with zero external dependencies (pure Node.js).
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

// Determine repo root directory
let repoRoot = __dirname;
while (repoRoot && !fs.existsSync(path.join(repoRoot, '.git'))) {
  const parent = path.dirname(repoRoot);
  if (parent === repoRoot) break;
  repoRoot = parent;
}

if (!fs.existsSync(path.join(repoRoot, '.git'))) {
  console.error('[AutoSync] Error: Could not locate .git directory from ' + __dirname);
  process.exit(1);
}

const DEBOUNCE_MS = 5000;       // Wait 5 seconds after last change before syncing
const POLLING_INTERVAL_MS = 30000; // Check every 30 seconds for any missed changes

// Directories and file patterns to ignore
const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  '.vercel',
  'logs',
  '.gemini',
  '.vscode'
]);

const IGNORED_EXTENSIONS = new Set([
  '.swp',
  '.tmp',
  '.log',
  '.crdownload'
]);

let debounceTimer = null;
let isSyncing = false;
let pendingSyncRequested = false;

function log(message, type = 'info') {
  const time = new Date().toLocaleTimeString();
  const prefixes = {
    info: '[\x1b[36mINFO\x1b[0m]',
    success: '[\x1b[32mSUCCESS\x1b[0m]',
    warn: '[\x1b[33mWARN\x1b[0m]',
    error: '[\x1b[31mERROR\x1b[0m]',
    sync: '[\x1b[35mSYNC\x1b[0m]'
  };
  const prefix = prefixes[type] || prefixes.info;
  console.log(`${prefix} [${time}] ${message}`);
}

function runGit(commandArgs) {
  try {
    const result = spawnSync('git', commandArgs, {
      cwd: repoRoot,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    return {
      status: result.status,
      stdout: (result.stdout || '').trim(),
      stderr: (result.stderr || '').trim()
    };
  } catch (err) {
    return { status: 1, stdout: '', stderr: err.message };
  }
}

function shouldIgnore(filePath) {
  if (!filePath) return true;
  const normalized = filePath.replace(/\\/g, '/');
  const segments = normalized.split('/');
  
  for (const segment of segments) {
    if (IGNORED_DIRS.has(segment)) return true;
  }
  
  const ext = path.extname(filePath).toLowerCase();
  if (IGNORED_EXTENSIONS.has(ext)) return true;

  // Ignore vim/temporary backup files
  const basename = path.basename(filePath);
  if (basename.startsWith('.~') || basename.endsWith('~') || basename.startsWith('.#')) {
    return true;
  }

  return false;
}

function performSync() {
  if (isSyncing) {
    pendingSyncRequested = true;
    return;
  }

  isSyncing = true;
  pendingSyncRequested = false;

  try {
    // 1. Check for working tree changes
    const statusRes = runGit(['status', '--porcelain']);
    const hasUncommittedChanges = statusRes.stdout.length > 0;

    // 2. Check for unpushed commits
    const unpushedRes = runGit(['log', 'origin/main..HEAD', '--oneline']);
    const hasUnpushedCommits = unpushedRes.stdout.length > 0;

    if (!hasUncommittedChanges && !hasUnpushedCommits) {
      isSyncing = false;
      return;
    }

    if (hasUncommittedChanges) {
      const statusLines = statusRes.stdout.split('\n').filter(Boolean);
      log(`Detected ${statusLines.length} modified file(s). Staging changes...`, 'sync');

      // Stage all changes
      runGit(['add', '-A']);

      // Prepare meaningful commit message
      const fileNames = statusLines
        .slice(0, 3)
        .map(l => {
          const trimmed = l.trim().substring(2).trim();
          return path.basename(trimmed);
        })
        .join(', ');
      
      const countSuffix = statusLines.length > 3 ? ` (+${statusLines.length - 3} more)` : '';
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const commitMsg = `auto-sync: update ${fileNames}${countSuffix} [${nowStr}]`;

      log(`Committing: "${commitMsg}"`, 'sync');
      const commitRes = runGit(['commit', '-m', commitMsg]);

      if (commitRes.status !== 0 && !commitRes.stdout.includes('nothing to commit')) {
        log(`Commit notice: ${commitRes.stderr || commitRes.stdout}`, 'warn');
      }
    }

    // 3. Push to GitHub origin main
    log('Pushing updates to GitHub (origin/main)...', 'sync');
    let pushRes = runGit(['push', 'origin', 'main']);

    if (pushRes.status !== 0) {
      log(`Push encountered an issue: ${pushRes.stderr}. Trying pull --rebase...`, 'warn');
      runGit(['pull', '--rebase', 'origin', 'main']);
      pushRes = runGit(['push', 'origin', 'main']);
    }

    if (pushRes.status === 0) {
      log('Successfully pushed changes to GitHub repository!', 'success');
    } else {
      log(`Push failed: ${pushRes.stderr || pushRes.stdout}`, 'error');
    }

  } catch (err) {
    log(`Sync error: ${err.message}`, 'error');
  } finally {
    isSyncing = false;
    if (pendingSyncRequested) {
      pendingSyncRequested = false;
      setTimeout(performSync, 1000);
    }
  }
}

function triggerDebouncedSync(changedFile) {
  if (changedFile && shouldIgnore(changedFile)) {
    return;
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    performSync();
  }, DEBOUNCE_MS);
}

// Start watching repository
log(`=======================================================`);
log(`  Auto Git Sync Active`);
log(`  Repository: ${repoRoot}`);
log(`  Debounce: ${DEBOUNCE_MS / 1000}s | Polling: ${POLLING_INTERVAL_MS / 1000}s`);
log(`=======================================================`);

// Initial sync check on startup
performSync();

try {
  fs.watch(repoRoot, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    if (shouldIgnore(filename)) return;
    triggerDebouncedSync(filename);
  });
  log('Filesystem watcher initialized successfully.', 'info');
} catch (err) {
  log(`Recursive watch error (${err.message}). Relying on periodic polling.`, 'warn');
}

// Background polling safety net
setInterval(() => {
  if (!isSyncing) {
    const statusRes = runGit(['status', '--porcelain']);
    const unpushedRes = runGit(['log', 'origin/main..HEAD', '--oneline']);
    if (statusRes.stdout.length > 0 || unpushedRes.stdout.length > 0) {
      log('Periodic check detected pending changes. Triggering sync...', 'info');
      performSync();
    }
  }
}, POLLING_INTERVAL_MS);

// Handle clean shutdown
process.on('SIGINT', () => {
  log('Shutting down Auto Git Sync daemon...', 'info');
  process.exit(0);
});
process.on('SIGTERM', () => {
  log('Shutting down Auto Git Sync daemon...', 'info');
  process.exit(0);
});
