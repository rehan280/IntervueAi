# Rollup Build Fix Documentation

## Problem
The build was failing with the error:
```
Error: Cannot find module @rollup/rollup-linux-x64-gnu at /opt/build/repo/node_modules/rollup/dist/native.js:59
```

This error occurs because the `@rollup/rollup-linux-x64-gnu` module is an optional dependency that wasn't being installed during the build process.

## Solution Implemented

### 1. Updated package.json
- Added `@rollup/rollup-linux-x64-gnu` as an optional dependency
- Updated build scripts to include optional dependencies during installation
- Maintained the existing override for Rollup

### 2. Updated Vite Configuration
- Added external configuration for `@rollup/rollup-linux-x64-gnu`
- Created a separate Rollup configuration file for better organization
- Integrated Rollup config with Vite build options

### 3. Updated Deployment Configurations
- **Netlify**: Updated build command to include optional dependencies
- **Vercel**: Updated install command to include optional dependencies

### 4. Created .npmrc
- Set `optional=true` to ensure optional dependencies are installed
- Maintained legacy peer deps for compatibility

## Files Modified

1. `package.json` - Added optional dependencies and updated build scripts
2. `vite.config.ts` - Added Rollup external configuration
3. `rollup.config.js` - Created dedicated Rollup configuration
4. `netlify.toml` - Updated build command
5. `vercel.json` - Updated install command
6. `.npmrc` - Configured npm to include optional dependencies

## Build Commands Updated

- `build:vercel`: Now includes `--include=optional` flag
- `build:netlify`: Now includes `--include=optional` flag
- `install:all`: Now includes `--include=optional` flag

## Verification

To verify the fix works:
1. Run `npm run build:vercel` locally
2. Deploy to Vercel/Netlify
3. Check that the build completes without the Rollup module error

## Notes

- The `@rollup/rollup-linux-x64-gnu` module is platform-specific and only needed on Linux x64 systems
- This fix ensures the module is available during build time on deployment platforms
- The external configuration prevents Rollup from trying to bundle this native module 