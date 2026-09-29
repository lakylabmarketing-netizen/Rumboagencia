@echo off
chcp 65001 >nul
cd /d "%~dp0"
where python >nul 2>nul || (echo No encuentro Python. Instalalo desde python.org y marca "Add to PATH". & pause & exit /b 1)
where claude >nul 2>nul || (echo No encuentro Claude Code. Instalalo desde https://jaredrhod.com/start & pause & exit /b 1)
python servidor.py
pause
