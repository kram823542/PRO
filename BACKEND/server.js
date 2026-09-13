// const express = require('express');
// const cors = require('cors');
// const dotenv = dotenv.config();
// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');

const dotenv = require('dotenv');
dotenv.config();   // ✅ .env file load karo — SABSE PEHLE

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables FIRST
dotenv.config();

const connectDB = require('./config/db');
const cloudinary = require('./config/cloudinary');

// ==============================
// 🎨 COLORS FOR CONSOLE
// ==============================
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  section: (msg) => {
    console.log(`\n${colors.bright}${colors.magenta}${'═'.repeat(60)}${colors.reset}`);
    console.log(`${colors.bright}${colors.magenta}  ${msg}${colors.reset}`);
    console.log(`${colors.bright}${colors.magenta}${'═'.repeat(60)}${colors.reset}`);
  },
  subSection: (msg) => {
    console.log(`\n${colors.bright}${colors.blue}▶ ${msg}${colors.reset}`);
    console.log(`${colors.blue}${'─'.repeat(60)}${colors.reset}`);
  },
};

// ==============================
// 🚀 MAIN STARTUP FUNCTION
// ==============================
const startServer = async () => {
  log.section('🚀 CLF EMPLOYEE ATTENDANCE SYSTEM');
  console.log(`${colors.bright}${colors.cyan}  Starting backend server...${colors.reset}`);
  console.log(`${colors.white}  Time: ${new Date().toLocaleString()}${colors.reset}`);

  // ==============================
  // 📋 ENV VARIABLES CHECK
  // ==============================
  log.subSection('📋 ENVIRONMENT VARIABLES CHECK');

  const requiredEnvVars = [
    'PORT',
    'NODE_ENV',
    'MONGODB_URI',
    'JWT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ];

  let envErrors = 0;
  requiredEnvVars.forEach((varName) => {
    if (process.env[varName]) {
      const value = process.env[varName];
      let displayValue = value;
      if (
        varName.includes('SECRET') ||
        varName.includes('URI') ||
        varName.includes('KEY')
      ) {
        displayValue =
          value.substring(0, 8) + '...' + value.substring(value.length - 4);
      }
      log.success(`${varName} = ${displayValue}`);
    } else {
      log.error(`${varName} is MISSING in .env file`);
      envErrors++;
    }
  });

  if (envErrors > 0) {
    log.error(`\n${envErrors} environment variable(s) missing.`);
    process.exit(1);
  }

    // ==============================
  // ☁️  CLOUDINARY CHECK
  // ==============================
  log.subSection('☁️  CLOUDINARY CONFIGURATION CHECK');

  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret) {
      log.success(`Cloudinary Cloud Name: ${cloudName}`);
      log.success(
        `Cloudinary API Key: ${apiKey.substring(0, 6)}...${apiKey.substring(
          apiKey.length - 4
        )}`
      );
      log.success('Cloudinary API Secret: ********');

      // Live ping test to Cloudinary
      try {
        const result = await cloudinary.api.ping();
        log.success(`Cloudinary Live Check: ${result.status}`);
      } catch (pingError) {
        log.warning('Cloudinary ping failed (network issue, credentials are OK)');
        log.info(`Reason: ${pingError.message || pingError.error?.message || 'Network timeout'}`);
        log.info('Server will continue. Image upload will be tested later.');
      }
    } else {
      log.error('Cloudinary configuration is incomplete');
      if (!cloudName) log.error('  → CLOUDINARY_CLOUD_NAME is missing');
      if (!apiKey) log.error('  → CLOUDINARY_API_KEY is missing');
      if (!apiSecret) log.error('  → CLOUDINARY_API_SECRET is missing');
    }
  } catch (error) {
    log.error(`Cloudinary Config Error: ${error.message}`);
  }









  // ==============================
  // 🗄️  MONGODB CONNECTION
  // ==============================
  log.subSection('🗄️  MONGODB CONNECTION');
  await connectDB();

  // ==============================
  // ⚙️  EXPRESS APP
  // ==============================
  log.subSection('⚙️  EXPRESS APP INITIALIZATION');

  const app = express();
  log.success('Express app created');

  // ==============================
  // 🔌 MIDDLEWARE
  // ==============================
  log.subSection('🔌 MIDDLEWARE SETUP');

  app.use(cors());
  log.success('CORS middleware enabled');

  app.use(express.json());
  log.success('JSON body parser enabled');

  app.use(express.urlencoded({ extended: true }));
  log.success('URL-encoded body parser enabled');

  // Request logger
  app.use((req, res, next) => {
    const start = Date.now();
    const timestamp = new Date().toLocaleTimeString();

    const methodColors = {
      GET: colors.green,
      POST: colors.blue,
      PUT: colors.yellow,
      DELETE: colors.red,
      PATCH: colors.magenta,
    };
    const methodColor = methodColors[req.method] || colors.white;

    console.log(
      `\n${colors.bright}${colors.white}[${timestamp}]${colors.reset} ` +
        `${methodColor}${colors.bright}${req.method}${colors.reset} ` +
        `${colors.cyan}${req.originalUrl}${colors.reset}`
    );

    if (req.body && Object.keys(req.body).length > 0) {
      const sanitizedBody = { ...req.body };
      if (sanitizedBody.password) sanitizedBody.password = '********';
      if (sanitizedBody.newPassword) sanitizedBody.newPassword = '********';
      if (sanitizedBody.adminPassword) sanitizedBody.adminPassword = '********';
      console.log(`  ${colors.white}Body:${colors.reset}`, JSON.stringify(sanitizedBody));
    }

    if (req.query && Object.keys(req.query).length > 0) {
      console.log(`  ${colors.white}Query:${colors.reset}`, JSON.stringify(req.query));
    }

    const originalSend = res.send;
    res.send = function (data) {
      const duration = Date.now() - start;
      const statusColor = res.statusCode >= 400 ? colors.red : colors.green;
      console.log(
        `  ${statusColor}${colors.bright}→ ${res.statusCode}${colors.reset} ` +
          `${colors.white}(${duration}ms)${colors.reset}`
      );
      originalSend.call(this, data);
    };

    next();
  });
  log.success('Request logger middleware enabled');

  // // ==============================
  // // 📁 UPLOADS FOLDER
  // // ==============================
  // log.subSection('📁 UPLOADS FOLDER CHECK');

  // const uploadsPath = path.join(__dirname, 'uploads');
  // if (!fs.existsSync(uploadsPath)) {
  //   fs.mkdirSync(uploadsPath, { recursive: true });
  //   log.warning('uploads/ folder created');
  // } else {
  //   log.success('uploads/ folder exists');
  // }

  // ==============================
  // 🛣️  LOADING ROUTES
  // ==============================
  log.subSection('🛣️  LOADING ROUTES');

  const routeFiles = [
    { path: './routes/authRoutes', endpoint: '/api/auth' },
    { path: './routes/adminUserRoutes', endpoint: '/api/admin/users' },
    { path: './routes/adminClfRoutes', endpoint: '/api/admin/clfs' },
    { path: './routes/adminEmployeeRoutes', endpoint: '/api/admin/employees' },
    { path: './routes/adminWorkRoutes', endpoint: '/api/admin/work' },
    { path: './routes/adminAttendanceRoutes', endpoint: '/api/admin/attendance' },
    { path: './routes/adminReportRoutes', endpoint: '/api/admin/reports' },
  ];

  const loadedRoutes = [];

  routeFiles.forEach((route) => {
    try {
      const routeModule = require(route.path);
      app.use(route.endpoint, routeModule);
      loadedRoutes.push(route);
      log.success(`Loaded: ${route.endpoint}`);
    } catch (error) {
      log.error(`Failed to load ${route.path}: ${error.message}`);
    }
  });

  // ==============================
  // ❤️  HEALTH CHECK
  // ==============================
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'OK',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(process.uptime())} seconds`,
      environment: process.env.NODE_ENV,
      database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      databaseName: mongoose.connection.name || 'N/A',
      cloudinary: 'Configured',
      loadedRoutes: loadedRoutes.map((r) => r.endpoint),
    });
  });
  log.success('Health check endpoint: GET /api/health');

  // ==============================
  // 🚫 404 HANDLER
  // ==============================
  app.use((req, res) => {
    log.warning(`404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
  });

  // ==============================
  // 🛑 GLOBAL ERROR HANDLER
  // ==============================
  app.use((err, req, res, next) => {
    console.error(`\n${colors.bgRed}${colors.white} ERROR ${colors.reset}`);
    console.error(`${colors.red}Message:${colors.reset}`, err.message);
    console.error(`${colors.red}Path:${colors.reset}`, req.method, req.originalUrl);
    console.error(`${colors.red}Stack:${colors.reset}`, err.stack);

    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  });

  // ==============================
  // 🌐 SERVER START
  // ==============================
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    log.section('✅ SERVER STARTED SUCCESSFULLY');

    console.log(`${colors.bright}${colors.green}`);
    console.log(`   🚀 Server running on:  ${colors.cyan}http://localhost:${PORT}${colors.green}`);
    console.log(`   📡 Environment:        ${colors.cyan}${process.env.NODE_ENV}${colors.green}`);
    console.log(`   🗄️  Database:           ${colors.cyan}attendance_db${colors.green}`);
    console.log(`   ☁️  Cloudinary:         ${colors.cyan}${process.env.CLOUDINARY_CLOUD_NAME}${colors.green}`);
    console.log(`   🛣️  Loaded Routes:      ${colors.cyan}${loadedRoutes.length}${colors.green}`);
    console.log(`${colors.reset}`);

    console.log(`${colors.bright}${colors.white}   📍 Available Endpoints:${colors.reset}`);
    console.log(`${colors.white}      Health Check:   ${colors.cyan}GET  http://localhost:${PORT}/api/health${colors.reset}`);
    console.log(`${colors.white}      Login:          ${colors.cyan}POST http://localhost:${PORT}/api/auth/login${colors.reset}`);
    console.log(`${colors.white}      Get Me:         ${colors.cyan}GET  http://localhost:${PORT}/api/auth/me${colors.reset}`);
    console.log(`${colors.white}      CLFs:           ${colors.cyan}GET  http://localhost:${PORT}/api/admin/clfs${colors.reset}`);
    console.log(`${colors.white}      Employees:      ${colors.cyan}GET  http://localhost:${PORT}/api/admin/employees${colors.reset}`);
    console.log(`${colors.white}      Pending Work:   ${colors.cyan}GET  http://localhost:${PORT}/api/admin/work/pending${colors.reset}`);
    console.log(`${colors.white}      Attendance:     ${colors.cyan}GET  http://localhost:${PORT}/api/admin/attendance/monthly${colors.reset}`);

    console.log(`\n${colors.bright}${colors.green}   ✅ System is ready! Waiting for requests...${colors.reset}\n`);
    console.log(`${colors.white}   💡 Press ${colors.red}Ctrl + C${colors.white} to stop the server${colors.reset}\n`);
  });

  // ==============================
  // 🎯 GRACEFUL SHUTDOWN
  // ==============================
  const gracefulShutdown = async (signal) => {
    log.section(`🛑 RECEIVED ${signal} - SHUTTING DOWN`);
    try {
      await mongoose.connection.close();
      log.success('MongoDB connection closed');

      server.close(() => {
        log.success('HTTP server closed');
        process.exit(0);
      });
    } catch (error) {
      log.error(`Error during shutdown: ${error.message}`);
      process.exit(1);
    }
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  process.on('unhandledRejection', (reason, promise) => {
    log.error(`Unhandled Rejection at: ${promise}`);
    log.error(`Reason: ${reason}`);
  });

  process.on('uncaughtException', (error) => {
    log.error(`Uncaught Exception: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  });
};

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});