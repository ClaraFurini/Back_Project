const logger = require('../logger');
const Episode = require('../models/episode');

const createEpisode = async (episodeData) => {
  const episode = new Episode(episodeData);
  return await episode.save();
};

const getAllEpisodes = async () => {
  return await Episode.find().populate('series');
};

const getEpisodeById = async (id) => {
  return await Episode.findById(id).populate('series');
};

const deleteEpisode = async (id) => {
  return await Episode.findByIdAndDelete(id);
};

module.exports = {
  createEpisode,
  getAllEpisodes,
  getEpisodeById,
  deleteEpisode,
};
