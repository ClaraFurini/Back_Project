const express = require('express');
const router = express.Router();
const logger = require('../logger');
const userService = require('../services/userService');

// Criar usuário
router.post('/', async (req, res) => {
  try {
    const novoUser = await userService.createUser(req.body);
    res.status(201).json(novoUser);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(400).json({ error: err.message });
  }
});

// Listar todos usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await userService.getAllUsers();
    res.json(usuarios);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

// Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    const deletado = await userService.deleteUser(req.params.id);
    if (!deletado) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
