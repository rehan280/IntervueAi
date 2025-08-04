# Netlify Deployment Guide

## ✅ Correct Netlify Settings

### Build Settings:
- **Branch to deploy:** `main`
- **Base directory:** `.` (root of your project)
- **Build command:** `npm run build:netlify`
- **Publish directory:** `dist`

### Environment Variables (Set in Netlify Dashboard):

#### Frontend Variables:
```
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_DEBUG=false
```

#### Backend Variables (if using Netlify Functions):
```
JWT_SECRET=your_very_secure_jwt_secret
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🔧 Netlify Configuration

The `netlify.toml` file is already configured with:

### Build Configuration:
```toml
[build]
  base = "."
  command = "npm run build:netlify"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  NODE_ENV = "production"
  NPM_FLAGS = "--no-optional --legacy-peer-deps"
```

### SPA Redirects:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Security Headers:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## 🚀 Deployment Steps

### 1. Connect to GitHub
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub
4. Select your repository: `IntervueAi`

### 2. Configure Build Settings
- **Branch:** `main`
- **Base directory:** Leave empty (root)
- **Build command:** `npm run build:netlify`
- **Publish directory:** `dist`

### 3. Set Environment Variables
In Netlify dashboard → Site settings → Environment variables:

#### Required Variables:
```
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

#### Optional Variables:
```
VITE_DEBUG=false
NODE_ENV=production
```

### 4. Deploy
Click "Deploy site" and wait for the build to complete.

## 🔍 Troubleshooting

### If Build Fails:

1. **Check Build Logs:**
   - Go to Netlify dashboard
   - Click on your site
   - Go to "Deploys" tab
   - Click on failed deploy to see logs

2. **Common Issues:**

   **"Cannot find module @rollup/rollup-linux-x64-gnu"**
   - ✅ Already fixed with `--no-optional --legacy-peer-deps`
   - ✅ Using `build:netlify` script

   **"Module not found"**
   - Ensure all dependencies are in `package.json`
   - Check if any imports are missing

   **"Build timeout"**
   - The build should complete within 10 minutes
   - If it times out, check for infinite loops or heavy operations

3. **Force Rebuild:**
   - Go to Netlify dashboard
   - Click "Trigger deploy" → "Deploy site"

## 📋 Pre-deployment Checklist

- [ ] All changes committed to GitHub
- [ ] `netlify.toml` file is in project root
- [ ] Environment variables set in Netlify dashboard
- [ ] Backend API is deployed and accessible
- [ ] API keys are valid and have proper permissions

## 🎯 Success Indicators

✅ Build completes without errors
✅ Site is accessible at Netlify URL
✅ Frontend loads correctly
✅ API calls work (if backend is deployed)
✅ AI features function properly

## 🔗 Useful Commands

```bash
# Test build locally
npm run build:netlify

# Check if dist folder is created
ls dist/

# Test the built site locally
npm run preview
```

## 📞 Support

If you encounter issues:
1. Check Netlify build logs
2. Verify environment variables are set correctly
3. Test build locally with `npm run build:netlify`
4. Check browser console for frontend errors
5. Verify API endpoints are working 