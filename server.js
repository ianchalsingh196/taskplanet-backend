
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); //

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); // For regular JSON data

// ✅ Serve static files from the 'public/images' directory
// This allows your frontend to display the images via URL
app.use('/images', express.static(path.join(__dirname, 'public/images'))); 

// 1. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch((err) => console.log("❌ Database Connection Error:", err));

// 2. Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

// Simple test route
app.get('/', (req, res) => {
  res.send("TaskPlanet Social Feed API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});