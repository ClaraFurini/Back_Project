const express = require('express');
const router = express.Router();
const logger = require('../logger');
const seriesService = require('../services/seriesService');

router.post('/', async (req, res) => {
  try {
    const novaSeries = await seriesService.createSeries(req.body);
    res.status(201).json(novaSeries);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const seriesList = await seriesService.getAllSeries();
    res.json(seriesList);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const series = await seriesService.getSeriesById(req.params.id);
    if (!series) {
      return res.status(404).json({ error: 'Series não encontrada' });
    }
    res.json(series);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletado = await seriesService.deleteSeries(req.params.id);
    if (!deletado) {
      return res.status(404).json({ error: 'Series não encontrada' });
    }
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
