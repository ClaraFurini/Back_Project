const express = require('express');
const router = express.Router();
const logger = require('../logger');
const contentService = require('../services/contentService');

router.post('/', async (req, res) => {
  try {
    const novoContent = await contentService.createContent(req.body);
    res.status(201).json(novoContent);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const contents = await contentService.getAllContents();
    res.json(contents);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const content = await contentService.getContentById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: 'Content não encontrado' });
    }
    res.json(content);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletado = await contentService.deleteContent(req.params.id);
    if (!deletado) {
      return res.status(404).json({ error: 'Content não encontrado' });
    }
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
