const logger = require('../logger');
const Rating = require('../models/Rating');

const createRating = async (ratingData) => {
  const rating = new Rating(ratingData);
  return await rating.save();
};

const getAllRatings = async () => {
  return await Rating.find().populate('profile').populate('content');
};

const getRatingById = async (id) => {
  return await Rating.findById(id).populate('profile').populate('content');
};

const deleteRating = async (id) => {
  return await Rating.findByIdAndDelete(id);
};

module.exports = {
  createRating,
  getAllRatings,
  getRatingById,
  deleteRating,
};
