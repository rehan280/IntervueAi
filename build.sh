#!/bin/bash

# Netlify Build Script
echo "🔧 Starting Netlify build..."

# Install dependencies with specific flags
echo "📦 Installing dependencies..."
npm ci --no-optional --legacy-peer-deps --prefer-offline

# Build the project
echo "🏗️ Building project..."
npm run build

echo "✅ Build completed!" 