const Comment = require('../models/Comment');
const Project = require('../models/Project');

// @desc    Add comment to project
// @route   POST /api/projects/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    // Check if project exists
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    // Create new comment
    const newComment = new Comment({
      text,
      user: req.user.id,
      project: req.params.id
    });
    
    const comment = await newComment.save();
    
    // Populate user data
    await comment.populate('user', 'name profilePicture');
    
    res.status(201).json(comment);
  } catch (err) {
    console.error('Error in addComment:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get all comments for a project
// @route   GET /api/projects/:id/comments
// @access  Public
const getCommentsByProject = async (req, res) => {
  try {
    // Check if project exists
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    const comments = await Comment.find({ project: req.params.id })
      .sort({ createdAt: -1 })
      .populate('user', 'name profilePicture');
    
    res.json(comments);
  } catch (err) {
    console.error('Error in getCommentsByProject:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    
    // Check if user owns the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this comment' });
    }
    
    await comment.deleteOne();
    
    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.error('Error in deleteComment:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  addComment,
  getCommentsByProject,
  deleteComment
};