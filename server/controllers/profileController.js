const User = require('../models/User');

// @desc    Get current user's profile
// @route   GET /api/profile/me
// @access  Private
const getCurrentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error in getCurrentProfile:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private
const createUpdateProfile = async (req, res) => {
  try {
    const {
      name,
      bio,
      profilePicture,
      skills,
      location,
      socialLinks
    } = req.body;

    // Build profile object
    const profileFields = {};

    if (name) profileFields.name = name;
    if (bio) profileFields.bio = bio;
    if (profilePicture) profileFields.profilePicture = profilePicture;
    if (skills) {
      profileFields.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map(skill => skill.trim());
    }
    if (location) profileFields.location = location;

    // Build social object
    if (socialLinks) {
      profileFields.socialLinks = {};
      if (socialLinks.github) profileFields.socialLinks.github = socialLinks.github;
      if (socialLinks.linkedin) profileFields.socialLinks.linkedin = socialLinks.linkedin;
      if (socialLinks.portfolio) profileFields.socialLinks.portfolio = socialLinks.portfolio;
    }

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Error in createUpdateProfile:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get all profiles
// @route   GET /api/profile
// @access  Public
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await User.find().select('-password');
    res.json(profiles);
  } catch (err) {
    console.error('Error in getAllProfiles:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get profile by user ID
// @route   GET /api/profile/:id
// @access  Public
const getProfileById = async (req, res) => {
  try {
    const profile = await User.findById(req.params.id).select('-password');

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error('Error in getProfileById:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  getCurrentProfile,
  createUpdateProfile,
  getAllProfiles,
  getProfileById
};