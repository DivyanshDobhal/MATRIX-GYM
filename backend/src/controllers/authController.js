import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import firebaseAdmin from '../config/firebase.js';
import crypto from 'crypto';
import axios from 'axios';

// Generate JWT and send in cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  res.status(statusCode).cookie('jwt', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.firstName + ' ' + user.lastName,
      email: user.email,
      profileCompleted: user.profileCompleted,
    },
  });
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, gender, age, height, weight, fitnessGoal } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // In a real app we'd hash the password here (e.g., using bcrypt). Since we're keeping it simple or maybe using Firebase:
    // Let's create user with the provided data.
    const user = await User.create({
      firstName,
      lastName,
      email,
      password, // Note: hash this in production!
      phoneNumber,
      gender,
      age,
      height,
      weight,
      fitnessGoal,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Simple password check. Hash comparison in production.
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Log user out / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// @desc    Google auth
// @route   POST /api/v1/auth/google
// @access  Public
export const googleAuth = async (req, res) => {
  try {
    const { accessToken } = req.body;

    // Use Google userinfo endpoint to verify access token
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { sub: uid, email, name, picture } = response.data;

    let user = await User.findOne({ email });

    if (!user) {
      const nameParts = name ? name.split(' ') : ['User', ''];
      user = await User.create({
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' ') || '',
        email,
        googleId: uid,
        firebaseUid: uid,
        profileImage: picture,
        isEmailVerified: true,
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('[Google Auth Error]', error.response?.data || error.message);
    const errorMessage = error.response?.data?.error_description || error.message;
    res.status(401).json({ success: false, message: 'Google authentication failed on backend', details: errorMessage });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  // In a real app you'd generate a token, save to DB, and send an email
  res.status(200).json({ success: true, message: 'Password reset email sent' });
};

// @desc    Reset password
// @route   POST /api/v1/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  res.status(200).json({ success: true, message: 'Password reset successful' });
};
