#!/bin/bash

# Vercel Deployment Script
# This script helps you deploy your project to Vercel with proper environment variables

echo "🚀 Starting Vercel Deployment Setup..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

echo "📝 Setting up environment variables..."

# Function to prompt for environment variable
prompt_env_var() {
    local var_name=$1
    local description=$2
    local current_value=$3
    
    echo ""
    echo "🔧 $description"
    if [ ! -z "$current_value" ]; then
        echo "Current value: $current_value"
        read -p "Enter new value (or press Enter to keep current): " new_value
        if [ ! -z "$new_value" ]; then
            echo "$var_name=$new_value" >> .env.local
        fi
    else
        read -p "Enter value for $var_name: " new_value
        if [ ! -z "$new_value" ]; then
            echo "$var_name=$new_value" >> .env.local
        fi
    fi
}

# Create .env.local file if it doesn't exist
touch .env.local

# Prompt for required environment variables
prompt_env_var "VITE_API_BASE_URL" "Frontend API Base URL (e.g., https://your-domain.vercel.app/api)" ""
prompt_env_var "VITE_GEMINI_API_KEY" "Gemini API Key for frontend" ""
prompt_env_var "JWT_SECRET" "JWT Secret for authentication (generate a strong random string)" ""
prompt_env_var "GEMINI_API_KEY" "Gemini API Key for backend" ""

echo ""
echo "📋 Optional environment variables:"
read -p "Do you want to set up Google OAuth? (y/n): " setup_google
if [ "$setup_google" = "y" ]; then
    prompt_env_var "GOOGLE_CLIENT_ID" "Google OAuth Client ID" ""
    prompt_env_var "GOOGLE_CLIENT_SECRET" "Google OAuth Client Secret" ""
fi

read -p "Do you want to set up Clerk authentication? (y/n): " setup_clerk
if [ "$setup_clerk" = "y" ]; then
    prompt_env_var "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" "Clerk Publishable Key" ""
    prompt_env_var "CLERK_SECRET_KEY" "Clerk Secret Key" ""
fi

echo ""
echo "🔧 Building project..."
npm run build

echo ""
echo "🚀 Deploying to Vercel..."
echo "Choose deployment option:"
echo "1. Deploy to production"
echo "2. Deploy to preview"
echo "3. Just set up environment variables"

read -p "Enter your choice (1-3): " deploy_choice

case $deploy_choice in
    1)
        echo "🚀 Deploying to production..."
        vercel --prod
        ;;
    2)
        echo "🚀 Deploying to preview..."
        vercel
        ;;
    3)
        echo "📝 Setting up environment variables only..."
        echo "You can deploy later with: vercel --prod"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Check your Vercel dashboard for the deployment"
echo "2. Verify all environment variables are set correctly"
echo "3. Test your application functionality"
echo "4. Update your domain settings if needed"
echo ""
echo "🔗 Useful commands:"
echo "- View deployment: vercel ls"
echo "- View logs: vercel logs"
echo "- Update environment variables: vercel env add"
echo "- Pull environment variables: vercel env pull" 