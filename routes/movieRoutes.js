const express = require('express');
const router = express.Router();
const logger = require('../logger');
const movieService = require('../services/movieService');

router.post('/', async (req, res) => {
  try {
    const novoMovie = await movieService.createMovie(req.body);
    res.status(201).json(novoMovie);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie não encontrado' });
    }
    res.json(movie);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletado = await movieService.deleteMovie(req.params.id);
    if (!deletado) {
      return res.status(404).json({ error: 'Movie não encontrado' });
    }
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
