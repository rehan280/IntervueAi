# ✅ Correct Netlify Settings

## Build Settings (Use These Exact Values):

| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` |
| **Base directory** | `.` (leave empty) |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Functions directory** | (leave empty) |

## Environment Variables (Set in Netlify Dashboard):

### Required Variables:
```
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Optional Variables:
```
VITE_DEBUG=false
NODE_ENV=production
```

## 🔧 What I Fixed:

1. **✅ Simplified build command** - Using just `npm run build`
2. **✅ Removed complex npm flags** - Netlify handles dependencies automatically
3. **✅ Used standard Vite build** - Most reliable approach
4. **✅ Set Node.js 18** - Via .nvmrc file

## 🚀 Deployment Steps:

1. **In Netlify Dashboard:**
   - Go to Site settings → Build & deploy
   - Set build command to: `npm run build`
   - Set publish directory to: `dist`
   - Leave base directory empty

2. **Set Environment Variables:**
   - Go to Site settings → Environment variables
   - Add the required variables listed above

3. **Deploy:**
   - Click "Trigger deploy" → "Deploy site"

## 🔍 If Build Still Fails:

### Try these alternative build commands in order:

1. **`npm run build`** (current setting)
2. **`npm ci && npm run build`**
3. **`npm install && npm run build`**
4. **`yarn build`** (if you want to use Yarn)

### Check Build Logs:
- Go to Netlify dashboard
- Click on your site
- Go to "Deploys" tab
- Click on failed deploy to see detailed logs

## 📋 Success Indicators:

✅ Build completes without errors
✅ Site is accessible at Netlify URL
✅ Frontend loads correctly
✅ No "command not found" errors
✅ No npm/rollup dependency errors

## 🎯 Key Points:

- **Use `npm run build`** - Simple and reliable
- **Leave base directory empty** - Uses project root
- **Set environment variables** - Required for your app to work
- **Check build logs** - If it fails, look at the detailed error messages

The current configuration should work with Netlify's standard build environment. 