@echo off
setlocal enabledelayedexpansion

set "PATH=C:\Users\Volt\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;C:\Users\Volt\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\mingw64\bin;%PATH%"
cd /d "%~dp0"

echo ============================================================
echo   Pushing Portfolio to https://github.com/roninvolt/roninvolt.git
echo ============================================================
echo.

echo [1/3] Staging changes...
git add -A

echo [2/3] Checking for changes to commit...
git diff --cached --quiet
if %errorlevel% neq 0 (
    set "COMMIT_MSG=%*"
    if "!COMMIT_MSG!"=="" (
        set "COMMIT_MSG=manual update: %DATE% %TIME%"
    )
    echo Committing changes with message: "!COMMIT_MSG!"
    git commit -m "!COMMIT_MSG!"
) else (
    echo No new uncommitted local file changes found.
)

echo.
echo [3/3] Pushing to origin main...
git push -u origin main
echo.

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. Attempting to pull and rebase...
    git pull --rebase origin main
    git push -u origin main
    if %errorlevel% neq 0 (
        echo [ERROR] Push failed. Please check network connection or credentials.
    ) else (
        echo [SUCCESS] Code synchronized and pushed to GitHub!
    )
) else (
    echo [SUCCESS] Your code has been pushed to GitHub!
)

echo.
pause
