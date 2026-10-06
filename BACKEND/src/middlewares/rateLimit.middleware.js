// import rateLimit from 'express-rate-limit';
// import { env } from '../config/env.js';

// export const globalLimiter = rateLimit({
//   windowMs: env.RATE_LIMIT.WINDOW_MS,
//   max: env.RATE_LIMIT.MAX,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: { success: false, message: 'Too many requests, please try again later.' },
// });

// export const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   skipSuccessfulRequests: true,
//   message: { success: false, message: 'Too many login attempts, try again in 15 min.' },
// });

// export const submissionLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 20,
//   message: { success: false, message: 'Too many submissions, slow down.' },
// });


import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

/**
 * ✅ Global limiter
 * Dev: 10,000 requests / 15 min
 * Prod: 2,000 requests / 15 min
 * Skip: notifications polling, GET requests (legitimate reads)
 */
export const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT.WINDOW_MS || 15 * 60 * 1000,
  max: env.IS_PROD ? 2000 : 10000,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    const path = req.path || req.url || '';
    const method = req.method || 'GET';

    // ✅ Notifications polling — skip (frontend bar bar fetch karta hai)
    if (path.includes('/notifications')) return true;

    // ✅ Sabhi GET requests — skip (reads are safe)
    if (method === 'GET') return true;

    return false;
  },
  message: { success: false, message: 'Too many requests, please try again later.' },
});

/**
 * ✅ Auth limiter — sirf login attempts ke liye
 * Dev: 100 attempts / 15 min
 * Prod: 10 attempts / 15 min
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.IS_PROD ? 10 : 100,
  skipSuccessfulRequests: true,
  message: { success: false, message: 'Too many login attempts, try again in 15 min.' },
});

/**
 * ✅ Submission limiter — POST/PATCH ke liye
 */
export const submissionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many submissions, slow down.' },
});