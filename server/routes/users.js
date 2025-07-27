const express = require('express');
const router = express.Router();
const { registerUser, getUsers, getUserById } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// @route   POST /api/users
// @desc    Register a new user
// @access  Public
router.post('/', registerUser);

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get('/', getUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', getUserById);

module.exports = router;