const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  importance: { type: String, required: true },
  image: { type: String },
  bannerImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Sport', sportSchema);
