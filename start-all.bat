@echo off
REM Complete Setup and Startup Script for Windows
REM This script will set up and start both backend and frontend

echo ==========================================
echo   Headcount Management System Setup
echo ==========================================
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
    pause
    exit /b 1
)

echo npm version:
npm --version
echo.

REM Setup Backend
echo ==========================================
echo   Setting up Backend
echo ==========================================
echo.

cd backend

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating backend .env file...
    copy .env.example .env
    echo Backend .env created
    echo Please update DATABASE_URL and JWT_SECRET in backend\.env
    echo.
)

REM Install backend dependencies
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
    echo Backend dependencies installed
) else (
    echo Backend dependencies already installed
)

REM Generate Prisma client
echo Generating Prisma client...
call npx prisma generate

echo.
echo Backend setup complete!
echo.

cd ..

REM Setup Frontend
echo ==========================================
echo   Setting up Frontend
echo ==========================================
echo.

cd frontend

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating frontend .env file...
    copy .env.example .env
    echo Frontend .env created
)

REM Install frontend dependencies
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
    echo Frontend dependencies installed
) else (
    echo Frontend dependencies already installed
)

echo.
echo Frontend setup complete!
echo.

cd ..

REM Start servers
echo ==========================================
echo   Starting Servers
echo ==========================================
echo.

echo IMPORTANT: Make sure PostgreSQL is running!
echo IMPORTANT: Update backend\.env with your database credentials
echo.
echo Starting backend on http://localhost:5000
echo Starting frontend on http://localhost:3000
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start backend
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo.

pause

@REM Made with Bob
