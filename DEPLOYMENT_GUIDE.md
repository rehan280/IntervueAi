# Deployment Guide for Piston API Backend Proxy

This guide covers deploying both the frontend and backend to production environments.

## 🚀 Backend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Create vercel.json in backend folder:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

3. **Deploy:**
   ```bash
   cd backend
   vercel --prod
   ```

4. **Get your backend URL** (e.g., `https://your-backend.vercel.app`)

### Option 2: Render

1. **Create render.yaml in backend folder:**
   ```yaml
   services:
     - type: web
       name: piston-api-backend
       env: node
       buildCommand: npm install
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
   ```

2. **Deploy via Render dashboard** or use their CLI

### Option 3: Railway

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```

### Option 4: Heroku

1. **Create Procfile in backend folder:**
   ```
   web: node server.js
   ```

2. **Deploy:**
   ```bash
   cd backend
   heroku create your-app-name
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Create vercel.json in root:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Build and deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Option 3: GitHub Pages

1. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... other config
   })
   ```

2. **Deploy via GitHub Actions**

## 🔧 Environment Configuration

### Frontend Environment Variables

Create `.env` file in your frontend root:

```bash
# Development
VITE_API_BASE_URL=http://localhost:5000

# Production (replace with your backend URL)
VITE_API_BASE_URL=https://your-backend-domain.com
```

### Backend Environment Variables

For production, set these environment variables:

```bash
# Node environment
NODE_ENV=production

# Port (optional, most platforms set this automatically)
PORT=5000

# CORS origins (if needed)
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🔒 Security Considerations

### Backend Security

1. **Add rate limiting:**
   ```bash
   npm install express-rate-limit
   ```

   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

2. **Add input validation** (already implemented)

3. **Add CORS configuration for production:**
   ```javascript
   app.use(cors({
     origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
     credentials: true
   }));
   ```

### Frontend Security

1. **Validate environment variables:**
   ```typescript
   if (!import.meta.env.VITE_API_BASE_URL) {
     console.error('VITE_API_BASE_URL is not set');
   }
   ```

2. **Add error boundaries** for React components

## 📊 Monitoring & Logging

### Backend Monitoring

1. **Add logging:**
   ```javascript
   const morgan = require('morgan');
   app.use(morgan('combined'));
   ```

2. **Add health checks** (already implemented)

3. **Monitor API usage** with your hosting provider

### Frontend Monitoring

1. **Add error tracking:**
   ```typescript
   window.addEventListener('error', (event) => {
     console.error('Global error:', event.error);
     // Send to your error tracking service
   });
   ```

## 🧪 Testing Deployment

### Test Backend

```bash
# Test health endpoint
curl https://your-backend-domain.com/api/health

# Test code execution
curl -X POST https://your-backend-domain.com/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello from production!\")",
    "language": "python"
  }'
```

### Test Frontend

1. **Check environment variables** are loaded correctly
2. **Test code execution** with different languages
3. **Verify error handling** works properly

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm install
      - run: cd backend && npm test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./backend

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.FRONTEND_PROJECT_ID }}
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS errors:**
   - Check CORS configuration in backend
   - Verify frontend URL is allowed

2. **Environment variables not loading:**
   - Ensure variables start with `VITE_` for frontend
   - Restart development server after changes

3. **Backend not responding:**
   - Check logs in hosting platform
   - Verify all dependencies are installed
   - Test locally first

4. **Code execution timeouts:**
   - Increase timeout in backend (currently 30s)
   - Check Piston API status

### Debug Mode

Enable debug logging:

```bash
# Backend
DEBUG=true npm start

# Frontend
VITE_DEBUG=true npm run dev
```

## 📈 Performance Optimization

### Backend

1. **Add caching** for language lists
2. **Implement connection pooling** for database (if added)
3. **Use compression** middleware

### Frontend

1. **Code splitting** for large components
2. **Lazy loading** for code examples
3. **Optimize bundle size**

## 🎯 Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] Health checks working
- [ ] Code execution tested
- [ ] Error handling tested
- [ ] Monitoring set up
- [ ] SSL certificates configured
- [ ] Domain names configured
- [ ] Performance tested

## 📞 Support

If you encounter issues:

1. Check the hosting platform logs
2. Test locally first
3. Verify environment variables
4. Check network connectivity
5. Review security settings

## 🎉 Next Steps

After deployment:

1. Set up monitoring and alerts
2. Configure custom domains
3. Add analytics tracking
4. Implement user authentication (if needed)
5. Add more language support
6. Optimize performance 