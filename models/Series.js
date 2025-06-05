const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
  seasons: { type: Number, default: 1 }
});

module.exports = mongoose.model('Series', seriesSchema);
