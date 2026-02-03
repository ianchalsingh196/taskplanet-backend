

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    default: "" 
  },
  likes: [
    { 
      type: String 
    }
  ],
  comments: [
    {
      username: { type: String, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now } 
    }
  ],
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Post', PostSchema);