const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, links, tags, image } = req.body;

    // Create new project
    const newProject = new Project({
      title,
      description,
      links,
      tags,
      image,
      user: req.user.id
    });

    const project = await newProject.save();

    res.status(201).json(project);
  } catch (err) {
    console.error('Error in createProject:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name profilePicture');
    res.json(projects);
  } catch (err) {
    console.error('Error in getProjects:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      'user',
      'name profilePicture bio skills socialLinks'
    );

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error('Error in getProjectById:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if user owns the project
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to update this project' });
    }

    // Update project
    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(project);
  } catch (err) {
    console.error('Error in updateProject:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if user owns the project
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this project' });
    }

    await project.deleteOne();

    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error('Error in deleteProject:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get projects by user ID
// @route   GET /api/projects/user/:userId
// @access  Public
const getProjectsByUser = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('user', 'name profilePicture');

    res.json(projects);
  } catch (err) {
    console.error('Error in getProjectsByUser:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByUser
};