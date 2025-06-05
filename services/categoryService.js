const logger = require('../logger');
const Category = require('../models/Category');

const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (id) => {
  return await Category.findById(id);
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
