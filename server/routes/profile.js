const express = require('express');
const router = express.Router();
const {
  getCurrentProfile,
  createUpdateProfile,
  getAllProfiles,
  getProfileById
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

// @route   GET /api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', protect, getCurrentProfile);

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', protect, createUpdateProfile);

// @route   GET /api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', getAllProfiles);

// @route   GET /api/profile/:id
// @desc    Get profile by user ID
// @access  Public
router.get('/:id', getProfileById);

module.exports = router;