// const mongoose = require('mongoose');

// const PostSchema = new mongoose.Schema({
//   username: { 
//     type: String, 
//     required: true 
//   },
//   text: { 
//     type: String, 
//     required: true 
//   },
//   image: { 
//     type: String // Stores the URL or path to the image
//   },
//   likes: [
//     { 
//       type: String // Array of usernames who liked the post
//     }
//   ],
//   comments: [
//     {
//       username: String,
//       text: String,
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],
// }, { timestamps: true });

// module.exports = mongoose.model('Post', PostSchema);

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true // Ensures every post is linked to a user
  },
  text: { 
    type: String, 
    required: true // Prevents empty posts
  },
  image: { 
    type: String, 
    default: "" // Stores the URL path to the image in public/images
  },
  likes: [
    { 
      type: String // Stores usernames of people who liked the post
    }
  ],
  comments: [
    {
      username: { type: String, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now } // Automatically tracks when comments are made
    }
  ],
}, { 
  timestamps: true // Automatically creates 'createdAt' and 'updatedAt' for the post
});

module.exports = mongoose.model('Post', PostSchema);