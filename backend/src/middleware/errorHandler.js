import ApiError from '../utils/ApiError.js';

/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  // Log detailed error stack in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error Handler] ${req.method} ${req.url} - RequestID: ${req.id || 'N/A'}`);
    console.error(err.stack);
  } else {
    console.error(`[Error Handler] ${req.method} ${req.url} - ${message}`);
  }

  // Ensure errors is always an array
  if (!Array.isArray(errors)) {
    errors = [errors];
  }

  // Return standard error response
  res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

export default errorHandler;
