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

// ✅ FIXED: Simple debug middleware
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    console.log('🌐 API Request Received:', {
      method: req.method,
      path: req.path,
      originalUrl: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }
  next();
});

// ✅ Routes with error handling
try {
  app.use('/api/auth', require('./routes/auth'));
  console.log('✅ Auth routes loaded successfully');
} catch (error) {
  console.error('❌ Failed to load auth routes:', error.message);
}

try {
  app.use('/api/posts', require('./routes/posts'));
  console.log('✅ Posts routes loaded successfully');
} catch (error) {
  console.error('❌ Failed to load posts routes:', error.message);
}

try {
  app.use('/api/admin', require('./routes/admin'));
  console.log('✅ Admin routes loaded successfully');
} catch (error) {
  console.error('❌ Failed to load admin routes:', error.message);
}

try {
  app.use('/api/upload', require('./routes/upload'));
  console.log('✅ Upload routes loaded successfully');
} catch (error) {
  console.error('❌ Failed to load upload routes:', error.message);
}

// Home route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Vlog Backend API - Connected Successfully!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts', 
      admin: '/api/admin',
      upload: '/api/upload'
    },
    note: 'This is backend API server. Frontend should handle routing.'
  });
});

// ✅ Test endpoint for forgot-password
app.post('/api/auth/test-forgot-password', (req, res) => {
  console.log('✅ Test forgot-password endpoint hit!');
  res.json({
    success: true,
    message: 'Forgot password endpoint is working!',
    timestamp: new Date().toISOString(),
    receivedData: req.body
  });
});

// ✅ FIXED: Remove problematic wildcard route completely
// Instead, handle only specific frontend routes that might be accessed

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

app.get('/profile', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API Server',
    note: 'Please use frontend for profile: /api/auth/me for user data'
  });
});

// ✅ FIXED: Simple catch-all for non-API routes without wildcard
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
          'GET /api/auth/me',
          'POST /api/auth/test-forgot-password'
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
    // For non-API routes, return simple message
    res.json({
      success: true,
      message: 'Vlog Backend API Server',
      version: '1.0.0',
      note: 'This is a backend API. Please use the frontend application.',
      frontendURLs: [
        'https://momentsme.vercel.app',
        'https://pro-git-main-kundan-rams-projects.vercel.app'
      ]
    });
  }
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB Connected Successfully to Atlas!');
  console.log('📊 Database:', mongoose.connection.name);
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Production Frontend URLs:`);
  console.log(`   • https://momentsme.vercel.app`);
  console.log(`   • https://pro-git-main-kundan-rams-projects.vercel.app`);
  console.log(`   • https://pro-p5h4kkshl-kundan-rams-projects.vercel.app`);
  console.log(`🔗 Backend: http://localhost:${PORT}`);
  console.log('');
  console.log('📝 Available API Endpoints:');
  console.log('   AUTH ENDPOINTS:');
  console.log('   POST   /api/auth/register          - User registration');
  console.log('   POST   /api/auth/login             - User login');
  console.log('   POST   /api/auth/forgot-password   - Forgot password (Send OTP)');
  console.log('   POST   /api/auth/reset-password    - Reset password (Verify OTP)');
  console.log('   GET    /api/auth/me               - Get current user');
  console.log('   POST   /api/auth/test-forgot-password - Test endpoint');
  console.log('');
  console.log('   POSTS ENDPOINTS:');
  console.log('   GET    /api/posts                  - Get all posts with categories');
  console.log('   GET    /api/posts/:id              - Get single post by ID');
  console.log('   POST   /api/posts/:id/like         - Like/unlike a post');
  console.log('   POST   /api/posts/:id/comments     - Add comment to post');
  console.log('   GET    /api/posts/:id/comments     - Get comments for a post');
  console.log('   POST   /api/posts                  - Create new post');
  console.log('   PUT    /api/posts/:id              - Update post');
  console.log('   DELETE /api/posts/:id              - Delete post');
  console.log('');
  console.log('   ADMIN ENDPOINTS:');
  console.log('   POST   /api/admin/login            - Admin login');
  console.log('   GET    /api/admin/stats            - Get admin statistics');
  console.log('   GET    /api/admin/users            - Get all users');
  console.log('   GET    /api/admin/posts            - Get all posts for admin');
});