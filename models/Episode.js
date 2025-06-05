const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  series: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
  season: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true }
});

module.exports = mongoose.model('Episode', episodeSchema);
