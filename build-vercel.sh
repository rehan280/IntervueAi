#!/bin/bash

# Vercel Build Script
# This script handles npm issues and builds the project for Vercel

echo "🔧 Starting Vercel build process..."

# Clean up any existing node_modules and package-lock.json
echo "🧹 Cleaning up existing dependencies..."
rm -rf node_modules package-lock.json

# Install dependencies with specific flags to avoid npm issues
echo "📦 Installing dependencies..."
npm install --no-optional --legacy-peer-deps --prefer-offline

# Build the project
echo "🏗️ Building project..."
npm run build

echo "✅ Build completed successfully!" 