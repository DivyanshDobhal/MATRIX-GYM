import { Router } from 'express';
import {
  register,
  login,
  logout,
  googleAuth,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/google', googleAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
// Keep the old route mapping to avoid breaking existing frontend code if any
router.get('/profile', protect, getMe); 

export default router;
