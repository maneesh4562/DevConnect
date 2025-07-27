const express = require('express');
const router = express.Router();
const { loginUser, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, getCurrentUser);

module.exports = router;