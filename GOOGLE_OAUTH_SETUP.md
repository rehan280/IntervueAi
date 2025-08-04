# Google OAuth Setup Guide

## ✅ **Current Status: Working Demo**
The Google Sign-In is currently working with a demo implementation that allows immediate testing without OAuth setup.

## 🚀 **Quick Start (Demo Mode)**
1. **Start your backend**: `cd backend && npm run dev`
2. **Start your frontend**: `npm run dev`
3. **Test Google Sign-In**: Click "Continue with Google (Demo)" on the login page
4. **Result**: You'll be automatically signed in as "Demo User"

## 🔧 **Setup Real Google OAuth (Optional)**

### Prerequisites
1. Google Cloud Console account
2. A Google Cloud Project

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google Identity API

### Step 2: Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "IntervueAi"
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes: `openid`, `email`, `profile`
5. Add test users (your email addresses)

### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `http://localhost:5173` (Vite dev server)
   - Your production domain
5. Add authorized redirect URIs:
   - `http://localhost:3000/login` (for development)
   - `http://localhost:5173/login` (Vite dev server)
   - Your production domain + `/login`
6. Copy the Client ID

### Step 4: Configure Environment Variables
Create a `.env` file in the `backend` folder:

```env
# JWT Secret Key (Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-from-step-3

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Step 5: Update Frontend for Real Google OAuth
Replace the mock Google Sign-In in `src/pages/Login.tsx` with real Google OAuth:

```typescript
// Replace the handleGoogleSignIn function with:
const handleGoogleSignIn = async () => {
  setIsLoading(true);
  setError('');

  try {
    // Initialize Google Sign-In
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_ACTUAL_GOOGLE_CLIENT_ID', // Replace with your Client ID
        callback: handleGoogleCallback,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      window.google.accounts.id.prompt();
    } else {
      // Fallback: redirect to Google OAuth
      window.location.href = '/api/auth/google';
    }
  } catch (err) {
    setError('Google Sign-In failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

const handleGoogleCallback = async (response: any) => {
  try {
    const result = await fetch('/api/auth/google/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credential: response.credential
      })
    });

    const data = await result.json();

    if (result.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      setError(data.message || 'Google Sign-In failed');
    }
  } catch (err) {
    setError('Google Sign-In failed. Please try again.');
  }
};
```

### Step 6: Add Google API Types
Add this to the top of `src/pages/Login.tsx`:

```typescript
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
          renderButton: (element: HTMLElement, options: any) => void;
        };
      };
    };
  }
}
```

## 🎯 **Current Features**

### ✅ **Working Demo Google Sign-In**
- One-click sign-in with demo user
- No OAuth setup required
- Full authentication flow
- User creation in MongoDB
- JWT token generation

### ✅ **Email/Password Authentication**
- User registration
- User login
- Password validation
- Form validation
- Error handling

### ✅ **Backend Integration**
- MongoDB user storage
- JWT token authentication
- User profile management
- Statistics tracking

## 🔧 **Troubleshooting**

### Demo Mode Issues:
1. **"Network error"**: Make sure your backend server is running
2. **"Google Sign-In failed"**: Check that MongoDB is connected
3. **"User not found"**: The demo user will be created automatically

### Real Google OAuth Issues:
1. **"Invalid Client ID"**: Make sure you're using the correct Client ID
2. **"Redirect URI mismatch"**: Check that your redirect URIs match exactly
3. **"OAuth consent screen not configured"**: Complete the OAuth consent screen setup
4. **"API not enabled"**: Enable the Google+ API and Google Identity API

## 🚀 **Next Steps**

1. **Test the demo**: Try the current working Google Sign-In
2. **Set up real OAuth**: Follow the setup guide above
3. **Customize user data**: Modify the mock user in the frontend
4. **Add more providers**: Implement other OAuth providers (GitHub, Facebook, etc.)

## 📝 **Notes**

- The demo mode works immediately without any setup
- Real Google OAuth requires proper configuration in Google Cloud Console
- Both modes create real users in your MongoDB database
- The backend handles both mock and real Google credentials
- JWT tokens work the same way for both authentication methods

## 🔗 **Additional Resources**
- [Google Identity Platform Documentation](https://developers.google.com/identity)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In for Web](https://developers.google.com/identity/sign-in/web) 