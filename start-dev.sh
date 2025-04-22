#!/bin/bash

# Kill any process running on port 3000
echo "Checking for processes on port 3000..."
PID=$(lsof -ti:3000)

if [ -n "$PID" ]; then
  echo "Killing process on port 3000 (PID: $PID)"
  kill -9 $PID
else
  echo "No process found on port 3000"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Installing dependencies..."
  npm install
fi

# Check if next command is available
if ! npm run dev --silent 2>/dev/null; then
  echo "Next.js command failed. Reinstalling dependencies..."
  rm -rf node_modules
  npm install
fi

# Start Next.js development server with Turbopack
echo "Starting Next.js with Turbopack on port 3000..."
npm run dev 