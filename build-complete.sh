#!/bin/bash

# Comprehensive Netlify Build Script
echo "🔧 Starting comprehensive Netlify build..."

# Set environment
export NODE_ENV=production

# Clean install all dependencies
echo "📦 Installing all dependencies..."
npm install --include=dev --no-optional --legacy-peer-deps

# Verify vite is installed
echo "🔍 Verifying Vite installation..."
if ! command -v npx vite &> /dev/null; then
    echo "⚠️ Vite not found, installing..."
    npm install vite@latest --save
fi

# Build the project
echo "🏗️ Building project..."
npm run build

echo "✅ Build completed successfully!" 