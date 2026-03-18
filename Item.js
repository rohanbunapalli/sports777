const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number } // Example property, can be optional
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
