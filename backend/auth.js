const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const uri = "mongodb+srv://intervueai:<rehanous>@intervueai.ba1lc0q.mongodb.net/?retryWrites=true&w=majority&appName=IntervueAi";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("intervueai");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// User registration
async function registerUser(userData) {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  try {
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create user object
    const newUser = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        avatar: null,
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

    // Insert user into database
    const result = await usersCollection.insertOne(newUser);

    // Create user object without password for response
    const userResponse = {
      _id: result.insertedId,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      profile: newUser.profile,
      stats: newUser.stats
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { user: userResponse, token };
  } catch (error) {
    throw error;
  }
}

// User login
async function loginUser(email, password) {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  try {
    // Find user by email
    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Create user object without password for response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      profile: user.profile,
      stats: user.stats
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { user: userResponse, token };
  } catch (error) {
    throw error;
  }
}

// Verify JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Get user by ID
async function getUserById(userId) {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  try {
    const user = await usersCollection.findOne(
      { _id: userId },
      { projection: { password: 0 } }
    );
    return user;
  } catch (error) {
    throw error;
  }
}

// Update user profile
async function updateUserProfile(userId, profileData) {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  try {
    const result = await usersCollection.updateOne(
      { _id: userId },
      { 
        $set: { 
          ...profileData,
          updatedAt: new Date()
        }
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
}

// Update user stats
async function updateUserStats(userId, statsData) {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  try {
    const result = await usersCollection.updateOne(
      { _id: userId },
      { 
        $set: { 
          stats: statsData,
          updatedAt: new Date()
        }
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  getUserById,
  updateUserProfile,
  updateUserStats,
  connectDB
}; 