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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// ✅ Email Service Configuration Check
console.log('\n📧 Email Service Status:');
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  console.log('   ✅ Nodemailer Email Service: CONFIGURED');
  console.log('   📧 Provider: Gmail SMTP');
} else {
  console.log('   ❌ Email Service: NOT CONFIGURED');
  console.log('   💡 OTP will be returned in API response for testing');
}

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
    emailService: process.env.EMAIL_USER ? 'Nodemailer (Gmail SMTP)' : 'Not Configured',
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
  const healthStatus = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      email: {
        configured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        provider: 'Nodemailer (Gmail SMTP)',
        status: process.env.EMAIL_USER ? 'Operational' : 'Not Configured'
      },
      database: {
        status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        readyState: mongoose.connection.readyState
      },
      jwt: {
        configured: !!process.env.JWT_SECRET,
        status: 'Operational'
      }
    },
    system: {
      memory: {
        used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
        total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`
      },
      uptime: `${Math.round(process.uptime())} seconds`,
      nodeVersion: process.version,
      platform: process.platform
    }
  };

  res.json(healthStatus);
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
      environment: process.env.NODE_ENV || 'development',
      emailService: process.env.EMAIL_USER ? 'Nodemailer (Gmail SMTP)' : 'Not Configured',
      note: 'This is a backend API. Please use the frontend application.',
      apiDocumentation: 'Visit /health for server status'
    });
  }
});

// ✅ ENHANCED: Global error handler
app.use((error, req, res, next) => {
  console.error('🚨 Global Error Handler:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(error.errors).map(e => e.message)
    });
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
      field: Object.keys(error.keyPattern)[0]
    });
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Default error
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: error.stack,
      details: error.toString()
    })
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
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    });
    
    console.log('✅ MongoDB Connected Successfully to Atlas!');
    console.log('📊 Database:', conn.connection.name);
    console.log('🏠 Host:', conn.connection.host);

    // MongoDB connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('💡 Solution:');
    console.log('   1. Check MONGODB_URI in .env file');
    console.log('   2. Add your IP to MongoDB Atlas whitelist');
    console.log('   3. Check internet connection');
    console.log('   4. Verify MongoDB Atlas cluster is running');
    
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
    
    const PORT = process.env.PORT || 10000;
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log('\n' + '='.repeat(60));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📧 Email Service: ${process.env.EMAIL_USER ? '✅ Nodemailer (Gmail SMTP)' : '❌ Not Configured'}`);
      console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'}`);
      console.log(`🔐 JWT: ${process.env.JWT_SECRET ? '✅ Configured' : '❌ Not Configured'}`);
      console.log('='.repeat(60));
      console.log('\n🔗 URLs:');
      console.log(`   Backend: http://localhost:${PORT}`);
      console.log(`   Frontend: https://momentsme.vercel.app`);
      console.log(`   Health Check: http://localhost:${PORT}/health`);
      console.log('\n📧 Email Service:');
      if (process.env.EMAIL_USER) {
        console.log('   ✅ Nodemailer: Active (Gmail SMTP)');
        console.log('   📧 Test: POST /api/auth/test-email');
      } else {
        console.log('   ❌ Email: Not configured');
        console.log('   💡 OTP will be returned in API response');
      }
      console.log('\n🔐 Auth Endpoints:');
      console.log(`   POST /api/auth/forgot-password   - Send OTP`);
      console.log(`   POST /api/auth/reset-password    - Reset password`);
      console.log(`   POST /api/auth/resend-otp        - Resend OTP`);
      console.log('\n📊 Monitoring:');
      console.log(`   GET /health - Server status & metrics`);
      console.log('\n');
    });

    // Server error handling
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
        console.log('💡 Try:');
        console.log('   1. Use a different PORT in .env');
        console.log('   2. Kill the process using port:', PORT);
        console.log('   3. Wait a few minutes and try again');
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n🛑 ${signal} received, shutting down gracefully...`);
      server.close(() => {
        console.log('✅ HTTP server closed');
        mongoose.connection.close(false, () => {
          console.log('✅ MongoDB connection closed');
          console.log('👋 Server shutdown complete');
          process.exit(0);
        });
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.log('⚠️ Forcing shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
  console.log('💡 Application will restart...');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  console.log('💡 Application will restart...');
  process.exit(1);
});

// Start the server
startServer();

module.exports = app; // For testing