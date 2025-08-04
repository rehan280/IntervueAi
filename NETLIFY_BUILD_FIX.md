# 🔧 Netlify Build Fix - Command Error Resolution

## **❌ Problem**
Build failed with exit code 127:
```
Command failed with exit code 127: npm ci --include=optional --legacy-peer-deps && npm run build
```

## **✅ Root Cause**
The `npm ci` command doesn't support the `--include=optional` flag. This flag is only available with `npm install`.

## **🔧 Solution Applied**

### **1. Fixed netlify.toml**
```toml
# Before (incorrect)
command = "npm ci --include=optional --legacy-peer-deps && npm run build"

# After (correct)
command = "npm install --include=optional --legacy-peer-deps && npm run build"
```

### **2. Updated package.json scripts**
```json
{
  "scripts": {
    "build:netlify": "npm install --include=optional --legacy-peer-deps && vite build"
  }
}
```

### **3. Updated vercel.json**
```json
{
  "installCommand": "npm install --include=optional --legacy-peer-deps --prefer-offline"
}
```

## **🚀 Alternative Build Commands**

If the above still fails, try these in order:

### **Option 1: Simple install**
```bash
npm install && npm run build
```

### **Option 2: With legacy peer deps**
```bash
npm install --legacy-peer-deps && npm run build
```

### **Option 3: Use yarn**
```bash
yarn install && yarn build
```

### **Option 4: Direct build**
```bash
npm run build
```

## **📋 Netlify Dashboard Settings**

### **Build Settings:**
| Setting | Value |
|---------|-------|
| **Build command** | `npm install --include=optional --legacy-peer-deps && npm run build` |
| **Publish directory** | `dist` |
| **Base directory** | `.` (empty) |

### **Environment Variables:**
```bash
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
```

## **🔍 Troubleshooting Steps**

### **Step 1: Check npm version**
The `--include=optional` flag requires npm 7+. Ensure Netlify uses Node.js 18+.

### **Step 2: Verify package.json**
Make sure `@rollup/rollup-linux-x64-gnu` is in `optionalDependencies`.

### **Step 3: Test locally**
```bash
npm install --include=optional --legacy-peer-deps
npm run build
```

### **Step 4: Use fallback configuration**
If issues persist, rename `netlify-simple.toml` to `netlify.toml` for a simpler setup.

## **✅ Success Indicators**

- ✅ Build completes without exit code 127
- ✅ No "command not found" errors
- ✅ Rollup dependencies install correctly
- ✅ Site deploys successfully
- ✅ Frontend loads without errors

## **📁 Files Modified**

1. `netlify.toml` - Fixed build command syntax
2. `package.json` - Updated build scripts
3. `vercel.json` - Fixed install command
4. `netlify-simple.toml` - Created fallback configuration

## **🎯 Key Takeaway**

Always use `npm install` with `--include=optional`, never `npm ci`. The `npm ci` command is for CI/CD environments and doesn't support optional dependency flags. 