import firebaseService from '../services/firebase.service.js';
import jwtService from '../services/jwt.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

class AuthController {
  /**
   * Handle Google sign in token exchange
   */
  googleSignIn = async (req, res, next) => {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        throw new ApiError(400, 'Firebase ID Token is required.');
      }

      // 1. Verify ID Token using Firebase Service
      const decodedUser = await firebaseService.verifyIdToken(idToken);

      // 2. Extract user details
      const userPayload = {
        uid: decodedUser.uid,
        email: decodedUser.email,
        name: decodedUser.name || decodedUser.email.split('@')[0],
        picture: decodedUser.picture || ''
      };

      // 3. Generate internal server JWT
      const token = jwtService.generateToken(userPayload);

      // 4. Return success response
      new ApiResponse(200, { token, user: userPayload }, 'Authentication successful.').send(res);
    } catch (error) {
      next(new ApiError(401, error.message || 'Authentication failed.'));
    }
  };

  /**
   * Handle guest sign in token generation for local development and testing
   */
  guestSignIn = async (req, res, next) => {
    try {
      const guestPayload = {
        uid: `guest_${Math.floor(100000 + Math.random() * 900000)}`,
        email: 'guest@matrixfitness.com',
        name: 'Guest Athlete',
        picture: ''
      };

      const token = jwtService.generateToken(guestPayload);

      new ApiResponse(200, { token, user: guestPayload }, 'Guest session established.').send(res);
    } catch (error) {
      next(new ApiError(500, error.message || 'Failed to establish guest session.'));
    }
  };

  /**
   * Get authenticated user profile details
   */
  getProfile = async (req, res, next) => {
    try {
      // req.user was attached by authMiddleware
      if (!req.user) {
        throw new ApiError(401, 'User profile not found. Session expired.');
      }

      new ApiResponse(200, { user: req.user }, 'Profile retrieved successfully.').send(res);
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
