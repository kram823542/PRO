// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ UPDATED CORS - All frontend domains added
app.use(cors({
  origin: [
    'https://momentsme.vercel.app',
    'https://pro-git-main-kundan-rams-projects.vercel.app', 
    'https://pro-p5h4kkshl-kundan-rams-projects.vercel.app',
    'http://localhost:3000', 
    'http://127.0.0.1:3000', 
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ ENHANCED: Better debug middleware
app.use((req, res, next) => {
  console.log('🌐 Incoming Request:', {
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString()
  });
  
  if (req.body && Object.keys(req.body).length > 0 && req.path !== '/api/auth/login') {
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = '***';
    if (safeBody.newPassword) safeBody.newPassword = '***';
    console.log('📦 Request Body:', safeBody);
  }
  next();
});

// ✅ Check Environment Configuration on Startup
console.log('🔧 Checking Environment Configuration:');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('   EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ NOT SET');
console.log('   EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ NOT SET');
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ NOT SET');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ NOT SET');

// ✅ Routes with enhanced error handling
const loadRoutes = () => {
  try {
    const authRoutes = require('./routes/auth');
    app.use('/api/auth', authRoutes);
    console.log('✅ Auth routes loaded successfully');
  } catch (error) {
    console.error('❌ Failed to load auth routes:', error.message);
  }

  try {
    const postRoutes = require('./routes/posts');
    app.use('/api/posts', postRoutes);
    console.log('✅ Posts routes loaded successfully');
  } catch (error) {
    console.error('❌ Failed to load posts routes:', error.message);
  }

  try {
    const adminRoutes = require('./routes/admin');
    app.use('/api/admin', adminRoutes);
    console.log('✅ Admin routes loaded successfully');
  } catch (error) {
    console.error('❌ Failed to load admin routes:', error.message);
  }

  try {
    const uploadRoutes = require('./routes/upload');
    app.use('/api/upload', uploadRoutes);
    console.log('✅ Upload routes loaded successfully');
  } catch (error) {
    console.error('❌ Failed to load upload routes:', error.message);
  }
};

loadRoutes();

// Home route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Vlog Backend API - Connected Successfully!',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    emailConfigured: !!process.env.EMAIL_USER,
    databaseConnected: mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts', 
      admin: '/api/admin',
      upload: '/api/upload'
    }
  });
});

// ✅ Health check with detailed status
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      email: {
        configured: !!process.env.EMAIL_USER,
        user: process.env.EMAIL_USER ? 'Set' : 'Not set'
      },
      database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      jwt: process.env.JWT_SECRET ? 'Configured' : 'Not configured'
    },
    memory: {
      used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`
    },
    uptime: `${Math.round(process.uptime())} seconds`
  });
});

// Common frontend routes that might hit backend
app.get('/login', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API Server',
    note: 'Please use frontend for login: /api/auth/login for API'
  });
});

app.get('/register', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API Server', 
    note: 'Please use frontend for registration: /api/auth/register for API'
  });
});

// ✅ ENHANCED: Catch-all for non-API routes
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    console.log('❌ API Route not found:', req.method, req.originalUrl);
    return res.status(404).json({
      success: false,
      message: `API route ${req.method} ${req.path} not found`,
      availableEndpoints: {
        auth: [
          'POST /api/auth/register',
          'POST /api/auth/login', 
          'POST /api/auth/forgot-password',
          'POST /api/auth/reset-password',
          'POST /api/auth/resend-otp',
          'GET /api/auth/me',
          'POST /api/auth/test-email'
        ],
        posts: [
          'GET /api/posts',
          'GET /api/posts/:id',
          'POST /api/posts/:id/like',
          'POST /api/posts/:id/comments', 
          'POST /api/posts',
          'PUT /api/posts/:id',
          'DELETE /api/posts/:id'
        ]
      }
    });
  } else {
    res.json({
      success: true,
      message: 'Vlog Backend API Server',
      version: '1.0.0',
      note: 'This is a backend API. Please use the frontend application.',
      apiDocumentation: 'Visit /health for server status'
    });
  }
});

// ✅ ENHANCED: Global error handler
app.use((error, req, res, next) => {
  console.error('🚨 Global Error Handler:', {
    message: error.message,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  });
});

// ✅ FIXED: Database connection without deprecated options
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('🔗 Connecting to MongoDB...');
    
    // ✅ REMOVED: Deprecated options useNewUrlParser and useUnifiedTopology
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB Connected Successfully to Atlas!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🏠 Host:', mongoose.connection.host);

    // MongoDB connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('💡 Solution:');
    console.log('   1. Check MONGODB_URI in .env file');
    console.log('   2. Add your IP to MongoDB Atlas whitelist');
    console.log('   3. Check internet connection');
    
    // Don't exit in development for better debugging
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

// Server startup
const startServer = async () => {
  try {
    await connectDB();
    
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log('\n' + '='.repeat(60));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📧 Email: ${process.env.EMAIL_USER ? '✅ Configured' : '❌ Not Configured'}`);
      console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'}`);
      console.log('='.repeat(60));
      console.log('\n🔗 URLs:');
      console.log(`   Backend: http://localhost:${PORT}`);
      console.log(`   Frontend: https://momentsme.vercel.app`);
      console.log('\n📧 Email Test:');
      console.log(`   POST http://localhost:${PORT}/api/auth/test-email`);
      console.log('\n🔐 Auth Endpoints:');
      console.log(`   POST /api/auth/forgot-password   - Send OTP`);
      console.log(`   POST /api/auth/reset-password    - Reset password`);
      console.log(`   POST /api/auth/resend-otp        - Resend OTP`);
      console.log('\n📊 Health Check:');
      console.log(`   GET http://localhost:${PORT}/health`);
      console.log('\n');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('✅ Server closed');
        mongoose.connection.close();
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('🛑 SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('✅ Server closed');
        mongoose.connection.close();
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();