const logger = require('../logger');
const Profile = require('../models/Profile');
const User = require('../models/User');

const createProfile = async (profileData) => {
  try {
    const profile = new Profile(profileData);
    const savedProfile = await profile.save();

    // Atualiza o usuário, adicionando o ID do novo perfil no array de profiles
    await User.findByIdAndUpdate(
      profileData.user,
      { $push: { profiles: savedProfile._id } },
      { new: true }
    );

    return savedProfile;

  } catch (err) {
    logger.error(err.message, { stack: err.stack });

    // Validação de campos obrigatórios
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      const error = new Error(messages.join(', '));
      error.status = 400;
      throw error;
    }

    throw err;
  }
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
