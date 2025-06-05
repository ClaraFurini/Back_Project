const logger = require('../logger');
const Series = require('../models/Series');

const createSeries = async (seriesData) => {
  const series = new Series(seriesData);
  return await series.save();
};

const getAllSeries = async () => {
  return await Series.find().populate('content');
};

const getSeriesById = async (id) => {
  return await Series.findById(id).populate('content');
};

const deleteSeries = async (id) => {
  return await Series.findByIdAndDelete(id);
};

module.exports = {
  createSeries,
  getAllSeries,
  getSeriesById,
  deleteSeries,
};
