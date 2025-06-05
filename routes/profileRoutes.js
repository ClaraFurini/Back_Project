const express = require('express');
const router = express.Router();
const logger = require('../logger');
const profileService = require('../services/profileService');

router.post('/', async (req, res) => {
  try {
    const novoProfile = await profileService.createProfile(req.body);
    res.status(201).json(novoProfile);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.json(profiles);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const profile = await profileService.getProfileById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile não encontrado' });
    }
    res.json(profile);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletado = await profileService.deleteProfile(req.params.id);
    if (!deletado) {
      return res.status(404).json({ error: 'Profile não encontrado' });
    }
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
