import jwtService from '../services/jwt.service.js';
import ApiError from '../utils/ApiError.js';

/**
 * Middleware to protect routes and verify JWT tokens
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Access denied. No authentication token provided.');
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new ApiError(401, 'Access denied. Token is missing.');
    }

    const decoded = jwtService.verifyToken(token);
    
    // Attach decoded user information to request object
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, error.message || 'Authentication failed. Invalid token.'));
  }
};

export default authMiddleware;
