const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken, getUserById } = require('../auth');
const axios = require('axios');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email, and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please enter a valid email address' 
      });
    }

    const result = await registerUser({ name, email, password });
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: result.user,
      token: result.token
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message === 'User with this email already exists') {
      return res.status(409).json({ 
        message: 'User with this email already exists' 
      });
    }

    res.status(500).json({ 
      message: 'Registration failed. Please try again.' 
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    const result = await loginUser(email, password);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: result.user,
      token: result.token
    });

  } catch (error) {
    console.error('Login error:', error);
    
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    res.status(500).json({ 
      message: 'Login failed. Please try again.' 
    });
  }
});

// Google OAuth callback (handles both real and mock Google Sign-In)
router.post('/google/callback', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ 
        message: 'Google credential is required' 
      });
    }

    let googleUser;

    try {
      // Try to decode as base64 (mock Google Sign-In)
      const decodedCredential = Buffer.from(credential, 'base64').toString();
      googleUser = JSON.parse(decodedCredential);
    } catch (err) {
      // If base64 decode fails, try real Google token verification
      try {
        const googleResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        googleUser = googleResponse.data;
      } catch (googleErr) {
        return res.status(400).json({ 
          message: 'Invalid Google credential' 
        });
      }
    }

    // Check if user exists in our database
    const db = await require('../auth').connectDB();
    const usersCollection = db.collection("users");
    
    let user = await usersCollection.findOne({ email: googleUser.email });

    if (!user) {
      // Create new user from Google data
      const newUser = {
        name: googleUser.name,
        email: googleUser.email,
        password: null, // No password for Google users
        googleId: googleUser.sub,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          avatar: googleUser.picture || null,
          bio: '',
          location: '',
          website: '',
          linkedin: ''
        },
        preferences: {
          notifications: true,
          emailUpdates: true
        },
        stats: {
          interviewsCompleted: 0,
          averageScore: 0,
          totalPracticeTime: 0
        }
      };

      const result = await usersCollection.insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    }

    // Generate JWT token
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create user response without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      profile: user.profile,
      stats: user.stats
    };

    res.status(200).json({
      success: true,
      message: 'Google Sign-In successful',
      user: userResponse,
      token: token
    });

  } catch (error) {
    console.error('Google Sign-In error:', error);
    res.status(500).json({ 
      message: 'Google Sign-In failed. Please try again.' 
    });
  }
});

// Google OAuth redirect (for server-side flow)
router.get('/google', (req, res) => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const REDIRECT_URI = `${req.protocol}://${req.get('host')}/api/auth/google/callback`;
  
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=openid email profile&` +
    `access_type=offline&` +
    `prompt=consent`;

  res.redirect(googleAuthUrl);
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      user: user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      message: 'Failed to get user profile' 
    });
  }
});

// Verify token endpoint
router.post('/verify', authenticateToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token is valid',
    user: req.user
  });
});

// Logout (client-side token removal)
router.post('/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router; 