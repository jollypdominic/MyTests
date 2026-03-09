#!/bin/bash

# Complete Setup and Startup Script
# This script will set up and start both backend and frontend

set -e

echo "=========================================="
echo "  Headcount Management System Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Recommended version: 18.x or higher"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Setup Backend
echo "=========================================="
echo "  Setting up Backend"
echo "=========================================="
echo ""

cd backend

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "✅ Backend .env created"
    echo "⚠️  Please update DATABASE_URL and JWT_SECRET in backend/.env"
    echo ""
fi

# Install backend dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    echo "✅ Backend dependencies installed"
else
    echo "✅ Backend dependencies already installed"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

echo ""
echo "✅ Backend setup complete!"
echo ""

cd ..

# Setup Frontend
echo "=========================================="
echo "  Setting up Frontend"
echo "=========================================="
echo ""

cd frontend

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating frontend .env file..."
    cp .env.example .env
    echo "✅ Frontend .env created"
fi

# Install frontend dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi

echo ""
echo "✅ Frontend setup complete!"
echo ""

cd ..

# Start servers
echo "=========================================="
echo "  Starting Servers"
echo "=========================================="
echo ""

echo "⚠️  IMPORTANT: Make sure PostgreSQL is running!"
echo "⚠️  Update backend/.env with your database credentials"
echo ""
echo "Starting backend on http://localhost:5000"
echo "Starting frontend on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

# Made with Bob
