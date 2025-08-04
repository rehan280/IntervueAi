# Vercel White Screen Fix Guide

## Issue Description
The application shows a white screen on Vercel deployment, indicating a build or routing issue.

## Root Causes & Solutions

### 1. Build Configuration Issues

**Problem**: Incorrect build commands or missing dependencies
**Solution**: 
- Updated `vercel.json` to use `npm run build:vercel`
- Added proper `distDir` configuration
- Ensured Node.js version compatibility

### 2. Asset Path Issues

**Problem**: Assets not loading due to incorrect paths
**Solution**:
- Kept `base: '/'` in Vite config for Vercel
- Added explicit asset routing in `vercel.json`
- Created `_redirects` file for SPA routing

### 3. SPA Routing Issues

**Problem**: React Router not working on Vercel
**Solution**:
- **Replaced BrowserRouter with HashRouter** (Primary fix)
- Simplified Vercel routing configuration
- Removed complex server-side routing requirements

## HashRouter Implementation

### Why HashRouter?
- **No server configuration needed**: HashRouter uses URL fragments (#) for routing
- **Works on any static hosting**: No need for server-side routing fallbacks
- **Simpler deployment**: Eliminates routing configuration complexity
- **Better compatibility**: Works consistently across all hosting platforms

### Changes Made:
1. **Updated App.tsx**:
   ```typescript
   import { HashRouter as Router, Routes, Route } from 'react-router-dom';
   ```

2. **Simplified vercel.json**:
   - Removed complex asset routing
   - Kept only API and catch-all routes

3. **Removed _redirects file**:
   - Not needed with HashRouter

## Fixed Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node",
      "config": {
        "nodeVersion": "18.x"
      }
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist",
        "nodeVersion": "18.x",
        "installCommand": "npm install",
        "buildCommand": "npm run build:vercel"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "backend/server.js": {
      "maxDuration": 30
    }
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["jspdf", "jspdf-autotable"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['@rollup/rollup-linux-x64-gnu'],
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT' && 
            warning.message && 
            warning.message.includes('@rollup/rollup-linux-x64-gnu')) {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  ssr: {
    noExternal: ['@radix-ui/react-icons']
  }
});
```

## Deployment Steps

1. **Clean and Build**:
   ```bash
   rm -rf dist
   npm install
   npm run build:vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Verify Deployment**:
   - Check Vercel dashboard for build logs
   - Test all routes work correctly
   - Verify assets load properly

## Environment Variables

Ensure these are set in Vercel dashboard:
- `NODE_ENV=production`
- `VITE_API_BASE_URL` (if using backend)
- `VITE_GEMINI_API_KEY` (if using AI features)

## Troubleshooting

### If white screen persists:

1. **Check Browser Console**:
   - Open Developer Tools
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **Check Vercel Logs**:
   ```bash
   vercel logs
   ```

3. **Test Locally**:
   ```bash
   npm run build:vercel
   npm run preview
   ```

4. **Verify Build Output**:
   - Check `dist/` folder exists
   - Verify `index.html` is present
   - Ensure all assets are built

### Common Issues:

1. **Missing Dependencies**: Run `npm install` before building
2. **Node Version**: Ensure Node.js 18.x is used
3. **Build Timeout**: Increase function timeout in `vercel.json`
4. **Memory Issues**: Optimize bundle size with code splitting

## HashRouter Benefits

✅ **No server routing configuration needed**
✅ **Works on any static hosting platform**
✅ **Simpler deployment process**
✅ **Better compatibility across platforms**
✅ **Eliminates white screen routing issues**

## Success Indicators

✅ Application loads without white screen
✅ All routes work correctly (with # in URLs)
✅ Assets (CSS, JS, images) load properly
✅ No console errors in browser
✅ Build completes successfully in Vercel

## Next Steps

After fixing the white screen:
1. Test all application features
2. Set up proper environment variables
3. Configure custom domain if needed
4. Set up monitoring and analytics 