@echo off
title Git Init - Shigeryu Studio

echo.
echo  Git Init - Shigeryu Studio
echo  ==========================
echo.

cd /d "%~dp0"

git init
git remote add origin https://github.com/ShigeryuStudio/ShigeryuStudio.github.io.git
git branch -M main

echo.
echo  Done. Run deploy.bat to push.
echo.
pause
