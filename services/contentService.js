const logger = require('../logger');
const Content = require('../models/Content');

const createContent = async (contentData) => {
  const content = new Content(contentData);
  return await content.save();
};

const getAllContents = async () => {
  return await Content.find().populate('categories');
};

const getContentById = async (id) => {
  return await Content.findById(id).populate('categories');
};

const deleteContent = async (id) => {
  return await Content.findByIdAndDelete(id);
};

module.exports = {
  createContent,
  getAllContents,
  getContentById,
  deleteContent,
};
