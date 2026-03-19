const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route imports
const adminRoutes = require('./routes/adminRoutes');
const postRoutes = require('./routes/postRoutes');
// Add this with other route imports
const contactRoutes = require('./routes/contactRoutes');


const app = express();

// ✅ SIMPLEST CORS FIX - Allow all origins (for development only)
app.use(cors({
    origin: true, // This allows any origin
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📌 ${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// API Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/posts', postRoutes);
// Add this with other route middleware
app.use('/api/contact', contactRoutes);

// 404 Handler
app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.originalUrl}`);
    res.status(404).json({ 
        success: false,
        message: 'Route not found',
        path: req.originalUrl,
        method: req.method
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(err.statusCode || 500).json({ 
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : 'Something went wrong'
    });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log('\n=================================');
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health: http://localhost:${PORT}/api/health`);
    console.log('=================================\n');
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.log('❌ UNHANDLED REJECTION:', err);
});

