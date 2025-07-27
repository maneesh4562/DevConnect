const express = require('express');
const router = express.Router();
const { search } = require('../controllers/searchController');

// @route   GET /api/search
// @desc    Search for users and projects
// @access  Public
router.get('/', search);

module.exports = router;