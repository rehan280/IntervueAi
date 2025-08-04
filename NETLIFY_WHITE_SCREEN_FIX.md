# 🔧 Netlify White Screen & Build Fix

## **❌ Current Issues:**
1. Build failing with exit code 127
2. White screen after deployment
3. Website not loading properly

## **✅ Complete Solution:**

### **1. Netlify Dashboard Settings (CRITICAL)**

Go to **Netlify Dashboard → Site settings → Build & deploy** and set:

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Base directory** | `.` (empty) |

### **2. Environment Variables (REQUIRED)**

In **Netlify Dashboard → Site settings → Environment variables**, add:

```bash
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
```

### **3. Alternative Build Commands (Try in Order)**

If the above doesn't work, try these build commands in Netlify Dashboard:

**Option 1:**
```bash
npm install --legacy-peer-deps && npm run build
```

**Option 2:**
```bash
npm ci --legacy-peer-deps && npm run build
```

**Option 3:**
```bash
npm install && npm run build
```

**Option 4:**
```bash
npm run build
```

### **4. Use Simple Configuration**

If issues persist, rename `netlify-simple-working.toml` to `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  NODE_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## **🔍 Troubleshooting Steps:**

### **Step 1: Check Build Logs**
- Go to Netlify dashboard
- Click on your site
- Go to "Deploys" tab
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

### **For Netlify Dashboard:**
```
Build command: npm run build
Publish directory: dist
```

### **For Manual Deploy:**
```bash
# Build locally
npm run build

# Upload dist folder to Netlify
```

## **✅ Success Indicators:**

- ✅ Build completes without errors
- ✅ Site loads with content (not white screen)
- ✅ No console errors in browser
- ✅ All routes work correctly
- ✅ Environment variables load properly

## **🎯 Most Likely Solutions:**

1. **Use simple build command**: `npm run build`
2. **Set environment variables** in Netlify dashboard
3. **Use simple netlify.toml** configuration
4. **Check browser console** for JavaScript errors

## **📞 If Still Not Working:**

1. Check Netlify build logs for specific errors
2. Verify all environment variables are set
3. Try the simple configuration
4. Test locally to ensure build works
5. Check browser console for runtime errors 