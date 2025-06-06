const logger = require('../logger');
const Profile = require('../models/Profile');
const User = require('../models/User');

const createProfile = async (profileData) => {
  try {
    const profile = new Profile(profileData);
    const savedProfile = await profile.save();

    // Adiciona o ID do perfil ao array profiles do usuário
    await User.findByIdAndUpdate(
      profile.user,
      { $push: { profiles: savedProfile._id } },
      { new: true }
    );

    return savedProfile;
  } catch (err) {
    logger.error(err.message, { stack: err.stack });

    // Erro de validação do Mongoose
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
  try {
    return await Profile.find().populate('user');
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    throw err;
  }
};

const getProfileById = async (id) => {
  try {
    return await Profile.findById(id).populate('user');
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    throw err;
  }
};

const deleteProfile = async (id) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(id);

    if (deletedProfile) {
      // Remove o ID do perfil do array profiles do usuário
      await User.findByIdAndUpdate(
        deletedProfile.user,
        { $pull: { profiles: deletedProfile._id } }
      );
    }

    return deletedProfile;
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    throw err;
  }
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  deleteProfile,
};
