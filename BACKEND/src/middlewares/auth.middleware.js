import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../modules/users/user.model.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  let token = null;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) throw ApiError.unauthorized('Authentication required');

  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT.ACCESS_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Token expired');
    }
    throw ApiError.unauthorized('Invalid token');
  }

  const user = await User.findById(decoded.sub).select('+password');
  if (!user) throw ApiError.unauthorized('User not found');
  if (user.status !== 'ACTIVE') throw ApiError.forbidden('Account inactive');
  if (user.isLocked?.()) throw ApiError.forbidden('Account locked');

  req.user = user;
  next();
});