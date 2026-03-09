@echo off
REM Frontend Installation Script for Windows
REM Run this script to install all dependencies and set up the frontend

echo.
echo Starting Frontend Installation...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Recommended version: 18.x or higher
    pause
    exit /b 1
)

echo Node.js version:
node --version

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo npm is not installed!
    echo Please install npm (usually comes with Node.js)
    pause
    exit /b 1
)

echo npm version:
npm --version
echo.

REM Navigate to frontend directory
cd /d "%~dp0"

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo .env file created
    echo Please update VITE_API_URL in .env if needed
) else (
    echo .env file already exists
)

echo.
echo Installing dependencies...
echo This may take a few minutes...
echo.

REM Install dependencies
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Installation completed successfully!
    echo.
    echo Frontend is ready!
    echo.
    echo Next steps:
    echo 1. Make sure the backend is running on http://localhost:5000
    echo 2. Run 'npm run dev' to start the development server
    echo 3. Open http://localhost:3000 in your browser
    echo.
) else (
    echo.
    echo Installation failed!
    echo Please check the error messages above and try again.
    pause
    exit /b 1
)

pause

@REM Made with Bob
