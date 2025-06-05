const logger = require('../logger');
const Movie = require('../models/Movie');

const createMovie = async (movieData) => {
  const movie = new Movie(movieData);
  return await movie.save();
};

const getAllMovies = async () => {
  return await Movie.find().populate('content');
};

const getMovieById = async (id) => {
  return await Movie.findById(id).populate('content');
};

const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  deleteMovie,
};
