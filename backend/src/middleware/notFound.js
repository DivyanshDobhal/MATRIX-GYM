import ApiError from '../utils/ApiError.js';

/**
 * Middleware to capture 404 Not Found routes
 */
const notFound = (req, res, next) => {
  const error = new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`);
  next(error);
};

export default notFound;
