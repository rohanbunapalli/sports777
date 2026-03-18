const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sports_website_db';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const Sport = require('./models/Sport');
const Item = require('./models/Item');

// Routes
// 1. Get all sports
app.get('/api/sports', async (req, res) => {
  try {
    const sports = await Sport.find();
    res.json(sports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sports' });
  }
});

// 2. Get specific sport details including items
app.get('/api/sports/:id', async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);
    if (!sport) return res.status(404).json({ error: 'Sport not found' });
    
    const items = await Item.find({ sportId: sport._id });
    res.json({ sport, items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sport details' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
