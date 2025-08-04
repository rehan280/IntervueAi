# Vercel Environment Variables Setup Guide

## Overview
This guide explains how to set up environment variables for your Vercel deployment.

## Environment Variables Structure

### Frontend Variables (Vite/React)
These are prefixed with `VITE_` and are accessible in your React application:

```bash
# API Configuration
VITE_API_BASE_URL=https://your-vercel-domain.vercel.app/api

# AI Services
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Debug Mode
VITE_DEBUG=false

# Authentication (if using Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Backend Variables (Node.js/Express)
These are used by your Express server and are set in Vercel dashboard:

```bash
# JWT Authentication
JWT_SECRET=your_very_secure_jwt_secret_key_here

# Google OAuth (if using)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI Services
GEMINI_API_KEY=your_gemini_api_key
```

## How to Set Environment Variables in Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Select your project

2. **Navigate to Settings**
   - Click on your project
   - Go to "Settings" tab
   - Click "Environment Variables"

3. **Add Variables**
   - Click "Add New"
   - Enter variable name and value
   - Select environment (Production, Preview, Development)
   - Click "Save"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add VITE_API_BASE_URL
vercel env add JWT_SECRET
vercel env add GEMINI_API_KEY

# Deploy with environment variables
vercel --prod
```

## Required Environment Variables

### For Production Deployment

#### Frontend Variables (set in Vercel dashboard):
```bash
VITE_API_BASE_URL=https://your-vercel-domain.vercel.app/api
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_DEBUG=false
```

#### Backend Variables (set in Vercel dashboard):
```bash
JWT_SECRET=your_very_secure_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key
```

### Optional Variables (if using these features):
```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Security Best Practices

1. **Never commit API keys to Git**
   - Use environment variables for all sensitive data
   - Keep `.env` files in `.gitignore`

2. **Use strong secrets**
   - Generate secure JWT secrets
   - Use different keys for development and production

3. **Rotate keys regularly**
   - Update API keys periodically
   - Monitor for unauthorized usage

## Testing Environment Variables

### Local Development
```bash
# Copy example file
cp env.example .env

# Edit .env file with your values
# Then run your development server
npm run dev
```

### Production Testing
```bash
# Test with Vercel CLI
vercel env pull .env.local
vercel dev
```

## Troubleshooting

### Common Issues:

1. **"VITE_ variables not found"**
   - Ensure variables are prefixed with `VITE_`
   - Check that variables are set in Vercel dashboard

2. **"API key not working"**
   - Verify API key is correct
   - Check if key has proper permissions
   - Ensure key is set for correct environment

3. **"JWT errors"**
   - Verify JWT_SECRET is set
   - Use a strong, unique secret
   - Check if secret is consistent across deployments

### Debug Commands:
```bash
# Check environment variables in browser console
console.log(import.meta.env);

# Check backend environment variables
console.log(process.env);
```

## Deployment Checklist

- [ ] Set `VITE_API_BASE_URL` to production URL
- [ ] Add `VITE_GEMINI_API_KEY` for AI features
- [ ] Set `JWT_SECRET` for authentication
- [ ] Configure `GEMINI_API_KEY` for backend
- [ ] Test deployment with `vercel --prod`
- [ ] Verify all features work in production

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Test locally with `vercel dev`
4. Check browser console for frontend errors
5. Check server logs for backend errors 