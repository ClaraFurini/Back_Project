const express = require('express');
const router = express.Router();
const logger = require('../logger');
const ratingService = require('../services/ratingService');

router.post('/', async (req, res) => {
  try {
    const novoRating = await ratingService.createRating(req.body);
    res.status(201).json(novoRating);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const ratings = await ratingService.getAllRatings();
    res.json(ratings);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const rating = await ratingService.getRatingById(req.params.id);
    if (!rating) {
      return res.status(404).json({ error: 'Rating não encontrado' });
    }
    res.json(rating);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletado = await ratingService.deleteRating(req.params.id);
    if (!deletado) {
      return res.status(404).json({ error: 'Rating não encontrado' });
    }
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
