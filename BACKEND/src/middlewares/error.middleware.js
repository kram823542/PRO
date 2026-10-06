import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { ApiError } from '../utils/ApiError.js';

export const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
};

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    if (error instanceof mongoose.Error.CastError) {
      error = ApiError.badRequest(`Invalid ${error.path}: ${error.value}`);
    } else if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((e) => ({
        field: e.path,
        message: e.message,
      }));
      error = ApiError.badRequest('Validation failed', errors);
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0] || 'field';
      error = ApiError.conflict(`Duplicate value for ${field}`);
    } else if (error.name === 'JsonWebTokenError') {
      error = ApiError.unauthorized('Invalid token');
    } else if (error.name === 'TokenExpiredError') {
      error = ApiError.unauthorized('Token expired');
    } else {
      error = ApiError.internal(error.message || 'Something went wrong');
    }
  }

  const response = {
    success: false,
    message: error.message,
    ...(error.errors?.length && { errors: error.errors }),
    ...(!env.IS_PROD && { stack: err.stack }),
  };

  if (error.statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} - ${err.message}\n${err.stack}`);
  }

  res.status(error.statusCode || 500).json(response);
};