# Automatic GitHub Sync Rule

Whenever changes, features, bug fixes, or edits are made to the codebase in this repository:
1. Always stage and commit the changes using `git add -A` and a descriptive commit message following conventional commits format (e.g., `feat(...)`, `fix(...)`, `style(...)`, `refactor(...)`).
2. Push the committed changes to GitHub `origin main`:
   `git push origin main`
3. Ensure the working tree is clean and confirmed synchronized with the GitHub repository (`https://github.com/roninvolt/roninvolt.git`).
4. If there is an active auto-sync daemon (`scripts/auto_git_sync.js`), it will automatically handle debounced background synchronization as well.
