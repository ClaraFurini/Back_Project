const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true } // em minutos
});

module.exports = mongoose.model('Movie', movieSchema);
