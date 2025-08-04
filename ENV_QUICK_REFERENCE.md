# Environment Variables Quick Reference

## 🚀 For Vercel Deployment

### Required Variables (Set in Vercel Dashboard)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Frontend API endpoint | `https://your-app.vercel.app/api` |
| `VITE_GEMINI_API_KEY` | Gemini API key for frontend | `AIzaSy...` |
| `JWT_SECRET` | JWT authentication secret | `your-super-secure-secret-here` |
| `GEMINI_API_KEY` | Gemini API key for backend | `AIzaSy...` |

### Optional Variables

| Variable | Description | When to Use |
|----------|-------------|-------------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | If using Google login |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | If using Google login |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | If using Clerk auth |
| `CLERK_SECRET_KEY` | Clerk secret key | If using Clerk auth |
| `VITE_DEBUG` | Enable debug mode | For development/testing |

## 🔧 How to Set in Vercel

### Method 1: Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Click "Add New"
4. Enter variable name and value
5. Select environment (Production/Preview/Development)
6. Click "Save"

### Method 2: Vercel CLI
```bash
# Add environment variables
vercel env add VITE_API_BASE_URL
vercel env add JWT_SECRET
vercel env add GEMINI_API_KEY

# Deploy
vercel --prod
```

## 🛠️ Local Development

Create a `.env` file in your project root:
```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_DEBUG=true
```

## 🔍 Troubleshooting

### Common Issues:
- **"VITE_ variables not found"**: Ensure variables are prefixed with `VITE_`
- **"API key not working"**: Verify key is correct and has proper permissions
- **"JWT errors"**: Use a strong, unique JWT secret

### Debug Commands:
```javascript
// Frontend (browser console)
console.log(import.meta.env);

// Backend (server logs)
console.log(process.env);
```

## 📋 Deployment Checklist

- [ ] Set `VITE_API_BASE_URL` to production URL
- [ ] Add `VITE_GEMINI_API_KEY` for AI features
- [ ] Set `JWT_SECRET` for authentication
- [ ] Configure `GEMINI_API_KEY` for backend
- [ ] Test deployment with `vercel --prod`
- [ ] Verify all features work in production

## 🚨 Security Notes

- Never commit API keys to Git
- Use different keys for dev/prod
- Rotate keys regularly
- Use strong JWT secrets
- Monitor for unauthorized usage 