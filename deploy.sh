#!/bin/bash

echo "🚀 Deploying to Vercel..."

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the frontend
echo "📦 Building frontend..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🎉 Your app is now live on Vercel!" 