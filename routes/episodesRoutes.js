const express = require('express');
const router = express.Router();
const logger = require('../logger');
const episodeService = require('../services/episodeService');

router.post('/', async (req, res) => {
  try {
    const novoEpisode = await episodeService.createEpisode(req.body);
    res.status(201).json(novoEpisode);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const episodes = await episodeService.getAllEpisodes();
    res.json(episodes);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const episode = await episodeService.getEpisodeById(req.params.id);
    if (!episode) {
      return res.status(404).json({ error: 'Episode não encontrado' });
    }
    res.json(episode);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletado = await episodeService.deleteEpisode(req.params.id);
    if (!deletado) {
      return res.status(404).json({ error: 'Episode não encontrado' });
    }
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
