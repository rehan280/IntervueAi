#!/bin/bash

# Simple Netlify Build Script
echo "🔧 Starting simple Netlify build..."

# Set Node environment
export NODE_ENV=production

# Install dependencies (Netlify usually does this automatically)
echo "📦 Installing dependencies..."
npm install --no-optional --legacy-peer-deps

# Build the project
echo "🏗️ Building project..."
npm run build

echo "✅ Build completed!" 