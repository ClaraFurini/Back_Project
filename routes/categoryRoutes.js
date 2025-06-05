const express = require('express');
const router = express.Router();
const logger = require('../logger');
const categoryService = require('../services/CategoryService');

router.post('/', async (req, res) => {
  try {
    const novaCategory = await categoryService.createCategory(req.body);
    res.status(201).json(novaCategory);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category não encontrada' });
    }
    res.json(category);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletado = await categoryService.deleteCategory(req.params.id);
    if (!deletado) {
      return res.status(404).json({ error: 'Category não encontrada' });
    }
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
