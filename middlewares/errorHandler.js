const logger = require('../logger');

function errorHandler(err, req, res, next) {
  // Loga o erro com stack trace
  logger.error(err.message, { stack: err.stack });

  // Retorna o status apropriado
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Erro interno do servidor' });
}

module.exports = errorHandler;
