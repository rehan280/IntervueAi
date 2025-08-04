# 🔧 Vercel White Screen Fix

## **❌ Current Issue:**
- White screen on Vercel deployment at `intervue-ai-hj9s.vercel.app`
- Build completes but site shows blank page
- No content loading

## **✅ Complete Solution:**

### **1. Vercel Dashboard Settings (CRITICAL)**

Go to **Vercel Dashboard → Project Settings → General** and set:

| Setting | Value |
|---------|-------|
| **Build Command** | `npm run build` |
| **Install Command** | `npm install` |
| **Output Directory** | `dist` |
| **Node.js Version** | `18.x` |

### **2. Environment Variables (REQUIRED)**

In **Vercel Dashboard → Project Settings → Environment Variables**, add:

```bash
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
```

### **3. Alternative Build Commands (Try in Order)**

If the above doesn't work, try these build commands in Vercel Dashboard:

**Option 1:**
```bash
npm install && npm run build
```

**Option 2:**
```bash
npm install --legacy-peer-deps && npm run build
```

**Option 3:**
```bash
npm ci && npm run build
```

**Option 4:**
```bash
npm run build
```

### **4. Use Simple Configuration**

If issues persist, rename `vercel-working.json` to `vercel.json`:

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
        "buildCommand": "npm run build"
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
  }
}
```

## **🔍 Troubleshooting Steps:**

### **Step 1: Check Build Logs**
- Go to Vercel dashboard
- Click on your project
- Go to "Deployments" tab
- Click on failed deploy
- Look for specific error messages

### **Step 2: Verify Environment Variables**
- Make sure all required environment variables are set
- Check that they don't have extra spaces
- Verify the API URLs are correct

### **Step 3: Test Locally**
```bash
# Test the exact build command
npm run build

# Check if dist folder is created
ls dist/

# Test the built files locally
npx serve dist
```

### **Step 4: Check for JavaScript Errors**
- Open browser developer tools
- Check Console tab for errors
- Check Network tab for failed requests

## **🚀 Quick Fix Commands:**

### **For Vercel Dashboard:**
```
Build command: npm run build
Install command: npm install
Output directory: dist
```

### **For Manual Deploy:**
```bash
# Build locally
npm run build

# Deploy to Vercel
vercel --prod
```

## **✅ Success Indicators:**

- ✅ Build completes without errors
- ✅ Site loads with content (not white screen)
- ✅ No console errors in browser
- ✅ All routes work correctly
- ✅ Environment variables load properly

## **🎯 Most Likely Solutions:**

1. **Use simple build command**: `npm run build`
2. **Set environment variables** in Vercel dashboard
3. **Use simple vercel.json** configuration
4. **Check browser console** for JavaScript errors

## **📞 If Still Not Working:**

1. Check Vercel build logs for specific errors
2. Verify all environment variables are set
3. Try the simple configuration
4. Test locally to ensure build works
5. Check browser console for runtime errors

## **🔧 Common Vercel Issues:**

### **White Screen Causes:**
- Missing environment variables
- JavaScript errors in production
- Incorrect build configuration
- Missing dependencies

### **Solutions:**
- Set all required environment variables
- Check browser console for errors
- Use simple build commands
- Verify all dependencies are installed 