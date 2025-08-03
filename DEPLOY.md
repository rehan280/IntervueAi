# Quick Deployment Guide

## Backend Deployment

### 1. Vercel (Recommended)

```bash
cd backend
npm install -g vercel
vercel --prod
```

### 2. Update Frontend Environment

Create `.env` file in frontend root:

```bash
# Development
VITE_API_BASE_URL=http://localhost:5000

# Production (replace with your backend URL)
VITE_API_BASE_URL=https://your-backend-domain.com
```

### 3. Test Deployment

```bash
# Test backend health
curl https://your-backend-domain.com/api/health

# Test code execution
curl -X POST https://your-backend-domain.com/api/run \
  -H "Content-Type: application/json" \
  -d '{"code":"print(\"Hello!\")","language":"python"}'
```

## Environment Variables

- `VITE_API_BASE_URL`: Backend API URL
- `NODE_ENV`: Set to 'production' for backend
- `PORT`: Backend port (auto-set by most platforms)

## Security Notes

- Backend includes input validation
- 30-second timeout for code execution
- CORS configured for local development
- Rate limiting recommended for production 