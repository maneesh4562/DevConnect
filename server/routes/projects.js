const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByUser
} = require('../controllers/projectController');
const {
  addComment,
  getCommentsByProject,
  deleteComment
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post('/', protect, createProject);

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', getProjects);

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', getProjectById);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', protect, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', protect, deleteProject);

// @route   GET /api/projects/user/:userId
// @desc    Get projects by user ID
// @access  Public
router.get('/user/:userId', getProjectsByUser);

// @route   POST /api/projects/:id/comments
// @desc    Add comment to project
// @access  Private
router.post('/:id/comments', protect, addComment);

// @route   GET /api/projects/:id/comments
// @desc    Get all comments for a project
// @access  Public
router.get('/:id/comments', getCommentsByProject);

// @route   DELETE /api/comments/:id
// @desc    Delete comment
// @access  Private
router.delete('/comments/:id', protect, deleteComment);

module.exports = router;