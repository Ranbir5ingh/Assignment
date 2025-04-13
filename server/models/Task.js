const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {  // Changed from userId to user to match controller
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [200, 'Task title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  // Removed completedAt since it's not being used
}, {
  timestamps: true // This will automatically handle createdAt and updatedAt
});

module.exports = mongoose.model('Task', TaskSchema);