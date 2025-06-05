const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  thumbnailUrl: String,
  releaseDate: Date,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  type: { type: String, enum: ['movie', 'series'], required: true }, // controle geral
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentSchema);
