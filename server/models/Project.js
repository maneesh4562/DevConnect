const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  links: {
    github: {
      type: String,
      trim: true
    },
    demo: {
      type: String,
      trim: true
    }
  },
  image: {
    type: String,
    default: 'default-project.jpg'
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for search functionality
ProjectSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Project', ProjectSchema);