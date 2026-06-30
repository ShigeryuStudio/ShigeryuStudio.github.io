@echo off
setlocal enabledelayedexpansion
title Deploy - Shigeryu Studio

echo.
echo  Deploy - Shigeryu Studio
echo  ========================
echo.

cd /d "%~dp0"

where git >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Git is not installed or not in PATH.
    pause
    exit /b 1
)

git add .

git diff --cached --quiet
if errorlevel 1 (
    echo  Files staged:
    git diff --cached --name-only
    echo.
    set /p COMMIT_MSG="Commit message: "

    if "!COMMIT_MSG!"=="" (
        echo  [CANCELLED] Commit message cannot be empty.
        pause
        exit /b 1
    )

    git commit -m "!COMMIT_MSG!"
    if errorlevel 1 (
        echo  [ERROR] Commit failed.
        pause
        exit /b 1
    )
) else (
    echo  Nothing to commit.
)

echo.
echo  Pushing...
git push
if errorlevel 1 (
    echo  [ERROR] Push failed.
    pause
    exit /b 1
)

echo.
echo  Done! https://shigeryustudio.github.io
echo.
pause
