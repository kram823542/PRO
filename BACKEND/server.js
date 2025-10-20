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

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/upload', require('./routes/upload'));

// Home route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Vlog Backend API - Connected Successfully!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      admin: '/api/admin'
    }
  });
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
  console.log(`   • https://pro-eosin-five.vercel.app`);
  console.log(`   • https://pro-git-main-kundan-rams-projects.vercel.app`);
  console.log(`   • https://pro-p5h4kkshl-kundan-rams-projects.vercel.app`);
  console.log(`🔗 Backend: http://localhost:5000`);
  console.log('');
  console.log('📝 Available API Endpoints:');
  console.log('   GET    /api/posts           - Get all posts with categories');
  console.log('   GET    /api/posts/:id       - Get single post by ID');
  console.log('   POST   /api/posts/:id/like  - Like/unlike a post');
  console.log('   POST   /api/posts/:id/comments - Add comment to post');
  console.log('   GET    /api/posts/:id/comments - Get comments for a post');
  onsole.log('   POST   /api/posts           - Create new post');
  consolelog('   PUT    /api/posts/:id       - Update post');
  console.log('   DELETE /api/posts/:id       - Delete post');
  console.log('   POST   /api/auth/register   - User registration');
  console.log('   POST   /api/auth/login      - User login');
  console.log('   POST   /api/admin/login     - Admin login');
  console.log('   GET    /api/admin/stats     - Get admin statistics');
  console.log('   GET    /api/admin/users     - Get all users');
  console.log('   GET    /api/admin/posts     - Get all posts for admin');
});