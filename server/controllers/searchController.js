const User = require('../models/User');
const Project = require('../models/Project');

// @desc    Search for users and projects
// @route   GET /api/search
// @access  Public
const search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ msg: 'Please provide a search query' });
    }

    // Create case-insensitive regex for search
    const regex = new RegExp(q, 'i');

    // Search for users by name
    const users = await User.find({
      $or: [{ name: regex }, { skills: regex }]
    }).select('-password');

    // Search for projects by title, description, or tags
    const projects = await Project.find({
      $or: [
        { title: regex },
        { description: regex },
        { tags: regex }
      ]
    }).populate('user', 'name profilePicture');

    res.json({
      users,
      projects
    });
  } catch (err) {
    console.error('Error in search:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  search
};