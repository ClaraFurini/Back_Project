const logger = require('../logger');
const Profile = require('../models/Profile');

const createProfile = async (profileData) => {
  const profile = new Profile(profileData);
  return await profile.save();
};

const getAllProfiles = async () => {
  return await Profile.find().populate('user');
};

const getProfileById = async (id) => {
  return await Profile.findById(id).populate('user');
};

const deleteProfile = async (id) => {
  return await Profile.findByIdAndDelete(id);
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  deleteProfile,
};
