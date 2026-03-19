
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/database');

// // Load env vars
// dotenv.config();

// // Connect to database
// connectDB();

// // Route imports
// const adminRoutes = require('./routes/adminRoutes');
// const postRoutes = require('./routes/postRoutes');

// const app = express();

// // Middleware
// app.use(cors({
//     origin: process.env.CLIENT_URL || 'http://localhost:3000',
//     credentials: true
// }));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Static files (अगर images upload कर रहे हैं तो)
// app.use('/uploads', express.static('uploads'));

// // Request logging middleware
// app.use((req, res, next) => {
//     console.log(`📌 ${new Date().toISOString()} - ${req.method} ${req.path}`);
//     if (req.method === 'POST' || req.method === 'PUT') {
//         console.log('📦 Body:', req.body);
//     }
//     next();
// });

// // API Health Check Route
// app.get('/api/health', (req, res) => {
//     res.status(200).json({ 
//         status: 'OK', 
//         message: 'Server is running',
//         timestamp: new Date().toISOString(),
//         environment: process.env.NODE_ENV || 'development'
//     });
// });

// // Routes
// app.use('/api/admin', adminRoutes);
// app.use('/api/posts', postRoutes);

// // ✅ FIXED: 404 Handler - WITHOUT using '*' 
// app.use((req, res) => {
//     console.log(`❌ 404 - Route not found: ${req.originalUrl}`);
//     res.status(404).json({ 
//         success: false,
//         message: 'Route not found',
//         path: req.originalUrl,
//         method: req.method
//     });
// });

// // ✅ Error Handling Middleware
// app.use((err, req, res, next) => {
//     console.error('❌ Error:', err);
    
//     // Mongoose Validation Error
//     if (err.name === 'ValidationError') {
//         const errors = Object.values(err.errors).map(e => e.message);
//         return res.status(400).json({ 
//             success: false,
//             message: 'Validation Error', 
//             error: errors
//         });
//     }
    
//     // JWT Errors
//     if (err.name === 'JsonWebTokenError') {
//         return res.status(401).json({ 
//             success: false,
//             message: 'Invalid token',
//             error: err.message 
//         });
//     }
    
//     if (err.name === 'TokenExpiredError') {
//         return res.status(401).json({ 
//             success: false,
//             message: 'Token expired',
//             error: err.message 
//         });
//     }
    
//     // MongoDB Duplicate Key Error
//     if (err.code === 11000) {
//         const field = Object.keys(err.keyPattern)[0];
//         return res.status(400).json({ 
//             success: false,
//             message: 'Duplicate key error',
//             error: `${field} already exists`
//         });
//     }
    
//     // CastError (MongoDB invalid ID)
//     if (err.name === 'CastError') {
//         return res.status(400).json({ 
//             success: false,
//             message: 'Invalid ID format',
//             error: 'The provided ID is not valid'
//         });
//     }
    
//     // Default server error
//     const statusCode = err.statusCode || 500;
//     res.status(statusCode).json({ 
//         success: false,
//         message: err.message || 'Internal Server Error',
//         error: process.env.NODE_ENV === 'development' ? err.stack : 'Something went wrong'
//     });
// });

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//     console.log('\n=================================');
//     console.log(`🚀 Server running on port ${PORT}`);
//     console.log(`📍 Local: http://localhost:${PORT}`);
//     console.log(`📍 Health: http://localhost:${PORT}/api/health`);
//     console.log(`📍 Admin: http://localhost:${PORT}/api/admin`);
//     console.log(`📍 Posts: http://localhost:${PORT}/api/posts`);
//     console.log(`📅 Started: ${new Date().toLocaleString()}`);
//     console.log('=================================\n');
// });

// // Unhandled Rejection Handler
// process.on('unhandledRejection', (err) => {
//     console.log('❌ UNHANDLED REJECTION! Shutting down...');
//     console.log(err.name, err.message);
//     console.log(err.stack);
//     server.close(() => {
//         process.exit(1);
//     });
// });

// // Uncaught Exception Handler
// process.on('uncaughtException', (err) => {
//     console.log('❌ UNCAUGHT EXCEPTION! Shutting down...');
//     console.log(err.name, err.message);
//     console.log(err.stack);
//     process.exit(1);
// });


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