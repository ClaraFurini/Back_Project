const logger = require('../logger');

function errorHandler(err, req, res, next) {

  logger.error(err.message, { stack: err.stack });

  
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Erro interno do servidor' });
}

module.exports = errorHandler;
