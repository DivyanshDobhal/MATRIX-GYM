import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'matrix_fitness_secret_backup_key_for_jwt_auth';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

class JwtService {
  /**
   * Generates a new JWT token
   * @param {Object} payload 
   * @returns {string} Token
   */
  generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
  }

  /**
   * Verifies a JWT token
   * @param {string} token 
   * @returns {Object} Decoded token payload
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired authentication token');
    }
  }
}

export default new JwtService();
