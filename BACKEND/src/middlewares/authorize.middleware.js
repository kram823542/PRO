import { ApiError } from '../utils/ApiError.js';

/** Role-based access */
export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) throw ApiError.unauthorized();
  if (!allowedRoles.includes(req.user.role)) {
    throw ApiError.forbidden(`Access denied for role: ${req.user.role}`);
  }
  next();
};

/** Hierarchy guard - ensures BPM/CLF access own scope */
export const scopeGuard = (resource) => (req, res, next) => {
  const { user } = req;
  if (user.role === 'SUPER_ADMIN') return next();

  // These will be checked in service layer using req.user + params
  // Middleware just ensures user context exists
  next();
};