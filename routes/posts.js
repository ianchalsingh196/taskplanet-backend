const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer'); //
const path = require('path');

// 1. Multer Configuration (Saves files to the folder you created)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // This folder must exist: Backend/public/images
    cb(null, 'public/images'); 
  },
  filename: (req, file, cb) => {
    // Unique name: timestamp + extension
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// 2. CREATE POST (Supports Text + Gallery Image)
// 'image' must match the key used in your frontend FormData
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newPost = new Post({
      username: req.body.username, // From localStorage
      text: req.body.text,
      // If a file is uploaded, store the full URL path
      image: req.file ? `http://localhost:5000/images/${req.file.filename}` : ""
    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    // Logs the exact error in your terminal to debug
    console.error("Post Creation Error:", err);
    res.status(500).json(err); 
  }
});

// 3. GET ALL POSTS (Sorted by newest first)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 4. LIKE / UNLIKE POST
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { username } = req.body;
    if (!post.likes.includes(username)) {
      await post.updateOne({ $push: { likes: username } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: username } });
      res.status(200).json("Post unliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 5. ADD COMMENT
router.post('/:id/comment', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const newComment = {
      username: req.body.username,
      text: req.body.text
    };
    post.comments.push(newComment);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 6. DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;