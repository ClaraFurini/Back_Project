const { createLogger, transports, format } = require('winston');
const path = require('path');

// Garante o formato do log com data, mensagem e stack trace
const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join('logs', 'error.log') }), // grava em logs/error.log
    new transports.Console() // também exibe no terminal
  ],
});

module.exports = logger;
