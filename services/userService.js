const logger = require('../logger');
const User = require('../models/User');

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getAllUsers = async () => {
  return await User.find().populate('profiles');
};

const getUserById = async (id) => {
  return await User.findById(id).populate('profiles');
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
