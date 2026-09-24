@echo off
title Auto Git Sync - Portfolio v2.0
set "PATH=C:\Users\Volt\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;C:\Users\Volt\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\mingw64\bin;%PATH%"
cd /d "%~dp0"

echo ============================================================
echo   Starting Auto Git Sync Daemon
echo   Watching project for changes and pushing to GitHub...
echo ============================================================
echo.

node scripts/auto_git_sync.js

pause
