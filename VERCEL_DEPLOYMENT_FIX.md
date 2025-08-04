# Vercel Deployment Fix Guide

## Issues Fixed

### 1. npm Optional Dependencies Bug
**Problem:** `Error: Cannot find module @rollup/rollup-linux-x64-gnu`
**Solution:** 
- Added `.npmrc` with `optional=false`
- Updated package.json with rollup overrides
- Used `--no-optional --legacy-peer-deps` flags

### 2. Node.js Version Issues
**Problem:** Module resolution errors with newer Node.js versions
**Solution:**
- Specified Node.js 18.x in vercel.json
- Added .nvmrc file
- Added engines field to package.json

### 3. Build Process Optimization
**Problem:** Slow and unreliable builds
**Solution:**
- Created build:vercel script
- Optimized Vite configuration
- Added proper build commands

## Files Modified

### 1. package.json
```json
{
  "engines": {
    "node": ">=18.0.0"
  },
  "overrides": {
    "rollup": {
      "optionalDependencies": {
        "@rollup/rollup-linux-x64-gnu": "4.9.5"
      }
    }
  },
  "scripts": {
    "build:vercel": "npm install --no-optional --legacy-peer-deps && vite build"
  }
}
```

### 2. .npmrc
```ini
optional=false
legacy-peer-deps=true
shamefully-hoist=true
registry=https://registry.npmjs.org/
```

### 3. vercel.json
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "nodeVersion": "18.x",
        "installCommand": "npm ci --no-optional --legacy-peer-deps --prefer-offline",
        "buildCommand": "npm run build:vercel"
      }
    }
  ]
}
```

### 4. vite.config.ts
```typescript
export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});
```

## Deployment Steps

### 1. Commit Changes
```bash
git add .
git commit -m "Fix Vercel deployment issues"
git push origin main
```

### 2. Set Environment Variables
Add these in Vercel dashboard:
- `VITE_API_BASE_URL`
- `VITE_GEMINI_API_KEY`
- `JWT_SECRET`
- `GEMINI_API_KEY`

### 3. Deploy
```bash
npm run deploy
```

## Troubleshooting

### If build still fails:
1. **Clear Vercel cache:**
   - Go to Vercel dashboard
   - Project settings → General → Clear build cache

2. **Force rebuild:**
   ```bash
   vercel --force
   ```

3. **Check logs:**
   ```bash
   vercel logs
   ```

### Common Issues:
- **"Module not found"**: Ensure all dependencies are in package.json
- **"Permission denied"**: Check file permissions
- **"Build timeout"**: Optimize build process

## Environment Variables Required

### Frontend (VITE_*):
- `VITE_API_BASE_URL`: Your Vercel domain + /api
- `VITE_GEMINI_API_KEY`: Google Gemini API key

### Backend:
- `JWT_SECRET`: Strong random string for authentication
- `GEMINI_API_KEY`: Google Gemini API key for backend

## Success Indicators

✅ Build completes without errors
✅ Environment variables are accessible
✅ Frontend loads correctly
✅ Backend API endpoints work
✅ AI features function properly

## Next Steps

1. Test all features after deployment
2. Monitor Vercel logs for any issues
3. Set up custom domain if needed
4. Configure analytics and monitoring 