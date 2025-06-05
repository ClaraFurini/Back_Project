const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
  score: { type: Number, min: 0, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', ratingSchema);
