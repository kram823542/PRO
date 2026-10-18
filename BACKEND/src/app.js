

// import express from 'express';
// import helmet from 'helmet';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
// import morgan from 'morgan';
// import hpp from 'hpp';

// import { env } from './config/env.js';
// import { logger } from './utils/logger.js';
// import routes from './routes/index.js';
// import { globalLimiter } from './middlewares/rateLimit.middleware.js';
// import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

// const app = express();

// // Trust proxy (Render, Vercel, Heroku ke liye zaroori hai)
// app.set('trust proxy', 1);

// // Security headers
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: 'cross-origin' },
//     contentSecurityPolicy: env.IS_PROD ? undefined : false,
//   })
// );

// // ✅ CORS — Fixed & Secure
// // Dev: localhost ke kisi bhi port se allow
// // Prod: sirf .env ke CLIENT_URL se allow
// app.use(
//   cors({
//     origin: (origin, cb) => {
//       // Allow requests without origin (Postman, curl, mobile apps)
//       if (!origin) return cb(null, true);

//       // Always allow origins configured in .env
//       if (env.CLIENT_URL.includes(origin)) {
//         return cb(null, true);
//       }

//       // Development: allow any localhost / 127.0.0.1 port
//       if (
//         !env.IS_PROD &&
//         /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
//       ) {
//         return cb(null, true);
//       }

//       // ❌ Reject in production
//       logger.warn(`🚫 CORS blocked origin: ${origin}`);
//       return cb(new Error(`CORS blocked: ${origin}`), false);
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     exposedHeaders: ['Content-Length', 'X-Total-Count'],
//     maxAge: 86400, // 24 hours preflight cache
//   })
// );

// // Body parsing
// app.use(express.json({ limit: '1mb' }));
// app.use(express.urlencoded({ extended: true, limit: '1mb' }));
// app.use(cookieParser());

// // Custom NoSQL Injection Protection (Express 5 Compatible)
// app.use((req, res, next) => {
//   const sanitize = (obj) => {
//     if (obj && typeof obj === 'object') {
//       for (const key in obj) {
//         if (/^\$|\./.test(key)) {
//           delete obj[key];
//         } else {
//           sanitize(obj[key]);
//         }
//       }
//     }
//   };
//   if (req.body) sanitize(req.body);
//   if (req.params) sanitize(req.params);
//   next();
// });

// // HTTP Parameter Pollution prevention
// app.use(hpp());

// // Compression
// app.use(compression());

// // Logging
// if (!env.IS_PROD) {
//   app.use(morgan('dev'));
// } else {
//   app.use(
//     morgan('combined', {
//       stream: { write: (msg) => logger.info(msg.trim()) },
//     })
//   );
// }

// // Health Check Endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is healthy' });
// });

// // Rate limiting
// app.use('/api', globalLimiter);

// // Routes
// app.use('/api/v1', routes);

// // 404 Handler
// app.use(notFoundHandler);

// // Error Handler (must be last)
// app.use(errorHandler);

// export default app;



// import express from 'express';
// import helmet from 'helmet';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
// import morgan from 'morgan';
// import hpp from 'hpp';

// import { env } from './config/env.js';
// import { logger } from './utils/logger.js';
// import routes from './routes/index.js';
// // ✅ NAYA: Leave routes import kiya
// import leaveRoutes from './modules/leaves/leave.routes.js'; 
// import { globalLimiter } from './middlewares/rateLimit.middleware.js';
// import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

// const app = express();

// // Trust proxy (Render, Vercel, Heroku ke liye zaroori hai)
// app.set('trust proxy', 1);

// // Security headers
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: 'cross-origin' },
//     contentSecurityPolicy: env.IS_PROD ? undefined : false,
//   })
// );

// // ✅ CORS — Fixed & Secure
// // Dev: localhost ke kisi bhi port se allow
// // Prod: sirf .env ke CLIENT_URL se allow
// app.use(
//   cors({
//     origin: (origin, cb) => {
//       // Allow requests without origin (Postman, curl, mobile apps)
//       if (!origin) return cb(null, true);

//       // Always allow origins configured in .env
//       if (env.CLIENT_URL.includes(origin)) {
//         return cb(null, true);
//       }

//       // Development: allow any localhost / 127.0.0.1 port
//       if (
//         !env.IS_PROD &&
//         /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
//       ) {
//         return cb(null, true);
//       }

//       // ❌ Reject in production
//       logger.warn(`🚫 CORS blocked origin: ${origin}`);
//       return cb(new Error(`CORS blocked: ${origin}`), false);
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     exposedHeaders: ['Content-Length', 'X-Total-Count'],
//     maxAge: 86400, // 24 hours preflight cache
//   })
// );

// // Body parsing
// app.use(express.json({ limit: '1mb' }));
// app.use(express.urlencoded({ extended: true, limit: '1mb' }));
// app.use(cookieParser());

// // Custom NoSQL Injection Protection (Express 5 Compatible)
// app.use((req, res, next) => {
//   const sanitize = (obj) => {
//     if (obj && typeof obj === 'object') {
//       for (const key in obj) {
//         if (/^\$|\./.test(key)) {
//           delete obj[key];
//         } else {
//           sanitize(obj[key]);
//         }
//       }
//     }
//   };
//   if (req.body) sanitize(req.body);
//   if (req.params) sanitize(req.params);
//   next();
// });

// // HTTP Parameter Pollution prevention
// app.use(hpp());

// // Compression
// app.use(compression());

// // Logging
// if (!env.IS_PROD) {
//   app.use(morgan('dev'));
// } else {
//   app.use(
//     morgan('combined', {
//       stream: { write: (msg) => logger.info(msg.trim()) },
//     })
//   );
// }

// // Health Check Endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is healthy' });
// });

// // Rate limiting
// app.use('/api', globalLimiter);

// // ✅ NAYA: Leave Route Add kiya
// app.use('/api/v1/leaves', leaveRoutes);

// // Routes
// app.use('/api/v1', routes);

// // 404 Handler
// app.use(notFoundHandler);

// // Error Handler (must be last)
// app.use(errorHandler);

// export default app;




import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import hpp from 'hpp';

import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import routes from './routes/index.js';
// ✅ NAYA: Leave routes import kiya
import leaveRoutes from './modules/leaves/leave.routes.js'; 
import { globalLimiter } from './middlewares/rateLimit.middleware.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Trust proxy (Render, Vercel, Heroku ke liye zaroori hai)
app.set('trust proxy', 1);

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: env.IS_PROD ? undefined : false,
  })
);

// ✅ CORS — Fixed & Secure
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (env.CLIENT_URL.includes(origin)) return cb(null, true);
      if (!env.IS_PROD && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return cb(null, true);
      logger.warn(`🚫 CORS blocked origin: ${origin}`);
      return cb(new Error(`CORS blocked: ${origin}`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'X-Total-Count'],
    maxAge: 86400,
  })
);

// ✅ Body parsing (Limit badha di taaki Base64 Profile Photo accept ho sake)
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Custom NoSQL Injection Protection (Express 5 Compatible)
app.use((req, res, next) => {
  const sanitize = (obj) => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (/^\$|\./.test(key)) {
          delete obj[key];
        } else {
          sanitize(obj[key]);
        }
      }
    }
  };
  if (req.body) sanitize(req.body);
  if (req.params) sanitize(req.params);
  next();
});

// HTTP Parameter Pollution prevention
app.use(hpp());

// Compression
app.use(compression());

// Logging
if (!env.IS_PROD) {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan('combined', {
      stream: { write: (msg) => logger.info(msg.trim()) },
    })
  );
}

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// Rate limiting
app.use('/api', globalLimiter);

// ✅ Leave Route
app.use('/api/v1/leaves', leaveRoutes);

// Routes
app.use('/api/v1', routes);

// 404 Handler
app.use(notFoundHandler);

// Error Handler (must be last)
app.use(errorHandler);

export default app;