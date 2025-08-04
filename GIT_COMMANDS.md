# Git Commands to Run in VS Code Terminal

## 📝 **Commands to Fix Vite Build Issue:**

```bash
# 1. Add all changes to staging
git add .

# 2. Commit the changes with a descriptive message
git commit -m "Fix Vite build issue for Netlify deployment - Move vite from devDependencies to dependencies - Update netlify.toml to install dev dependencies - Ensure vite is available during build process"

# 3. Push to GitHub
git push origin main
```

## 🔍 **Alternative (if you want to check changes first):**

```bash
# Check what files are changed
git status

# See the specific changes
git diff

# Then add and commit
git add .
git commit -m "Fix Vite build issue for Netlify"
git push origin main
```

## 🎯 **What These Changes Fix:**

1. **✅ Moved `vite` to dependencies** - Now available during Netlify build
2. **✅ Updated build command** - `npm install --include=dev && npm run build`
3. **✅ Ensures devDependencies are installed** - Including Vite and its plugins

## 📋 **After Pushing:**

- Netlify will automatically detect the changes
- It will install all dependencies including Vite
- The build should now work with `vite build` command

## 🚀 **Expected Result:**

✅ Build completes without "vite not found" error
✅ All dependencies are properly installed
✅ Vite build process works correctly
✅ Site deploys successfully

Run these commands in your VS Code terminal! 🎉 