#!/bin/bash

# Frontend Installation Script
# Run this script to install all dependencies and set up the frontend

echo "🚀 Starting Frontend Installation..."
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
    echo "Please install npm (usually comes with Node.js)"
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please update VITE_API_URL in .env if needed"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
echo ""

# Install dependencies
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation completed successfully!"
    echo ""
    echo "🎉 Frontend is ready!"
    echo ""
    echo "Next steps:"
    echo "1. Make sure the backend is running on http://localhost:5000"
    echo "2. Run 'npm run dev' to start the development server"
    echo "3. Open http://localhost:3000 in your browser"
    echo ""
else
    echo ""
    echo "❌ Installation failed!"
    echo "Please check the error messages above and try again."
    exit 1
fi

# Made with Bob
