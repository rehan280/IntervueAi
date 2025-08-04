# 🚀 Optimal Netlify Configuration Guide

## **📋 Complete Netlify Settings**

### **1. Build Settings (Netlify Dashboard)**

| Setting | Value | Description |
|---------|-------|-------------|
| **Branch to deploy** | `main` | Your main branch |
| **Base directory** | `.` (empty) | Project root |
| **Build command** | `npm ci --include=optional --legacy-peer-deps && npm run build` | Optimized for Rollup fix |
| **Publish directory** | `dist` | Vite output directory |
| **Functions directory** | (empty) | No serverless functions |

### **2. Environment Variables (Required)**

Set these in **Netlify Dashboard → Site settings → Environment variables**:

```bash
# Required for your app to work
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Build optimization
NODE_ENV=production
NPM_FLAGS=--include=optional --legacy-peer-deps

# Optional debugging
VITE_DEBUG=false
```

### **3. Node.js Version**

Create a `.nvmrc` file in your project root:
```bash
18
```

## **🔧 Key Configuration Features**

### **✅ Rollup Build Fix**
- Uses `npm ci --include=optional` to ensure `@rollup/rollup-linux-x64-gnu` is installed
- Includes `--legacy-peer-deps` for compatibility
- Optimized build command for reliability

### **✅ Security Headers**
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Content Security Policy (CSP)

### **✅ Performance Optimization**
- Long-term caching for static assets (1 year)
- Immutable cache headers for versioned files
- Optimized caching for JS, CSS, images, and fonts

### **✅ SPA Routing**
- Redirects all routes to `/index.html` for React Router
- Handles client-side routing properly

## **🚀 Deployment Steps**

### **Step 1: Netlify Dashboard Setup**
1. Go to **Site settings → Build & deploy**
2. Set build command: `npm ci --include=optional --legacy-peer-deps && npm run build`
3. Set publish directory: `dist`
4. Leave base directory empty

### **Step 2: Environment Variables**
1. Go to **Site settings → Environment variables**
2. Add all required variables listed above
3. Set them as **Production** variables

### **Step 3: Deploy**
1. Click **"Trigger deploy" → "Deploy site"**
2. Monitor the build logs
3. Verify successful deployment

## **🔍 Troubleshooting**

### **If Build Fails:**

**Option 1: Try alternative build command**
```bash
npm install --include=optional --legacy-peer-deps && npm run build
```

**Option 2: Use yarn (if preferred)**
```bash
yarn install && yarn build
```

**Option 3: Simple build (fallback)**
```bash
npm run build
```

### **Common Issues & Solutions:**

| Issue | Solution |
|-------|----------|
| Rollup module not found | ✅ Already fixed with `--include=optional` |
| Build timeout | Increase build timeout in Netlify settings |
| Memory issues | Use `npm ci` instead of `npm install` |
| Node version mismatch | Set `.nvmrc` file to `18` |

## **📊 Performance Monitoring**

### **Build Success Indicators:**
- ✅ Build completes in <5 minutes
- ✅ No Rollup dependency errors
- ✅ All environment variables loaded
- ✅ Site accessible at Netlify URL
- ✅ Frontend loads without console errors

### **Runtime Performance:**
- ✅ Static assets cached for 1 year
- ✅ Security headers properly set
- ✅ SPA routing works correctly
- ✅ API calls to backend succeed

## **🎯 Best Practices**

1. **Use `npm ci`** - Faster, more reliable than `npm install`
2. **Include optional dependencies** - Prevents Rollup build failures
3. **Set proper cache headers** - Improves loading performance
4. **Use security headers** - Protects against common attacks
5. **Monitor build logs** - Catch issues early

## **🔗 Related Files**

- `netlify.toml` - Main configuration file
- `package.json` - Build scripts and dependencies
- `.nvmrc` - Node.js version specification
- `vite.config.ts` - Vite build configuration
- `rollup.config.js` - Rollup external dependencies

This configuration ensures your app deploys successfully with optimal performance and security! 