# Agent Instructions - Auto GitHub Sync

- **Auto-Sync to GitHub**: Every task or change completed in this project MUST be staged, committed, and pushed to the GitHub repository (`https://github.com/roninvolt/roninvolt-portfolio-site.git`) on branch `main`.
- **Command Sequence**:
  ```bash
  git add -A
  git commit -m "<descriptive message>"
  git push origin main
  ```
- **Live Background Daemon**: A background auto-sync watcher exists at `scripts/auto_git_sync.js` (runnable via `npm run auto-sync` or `start_auto_sync.bat`) which watches for filesystem changes and automatically commits & pushes after 5 seconds of inactivity.
