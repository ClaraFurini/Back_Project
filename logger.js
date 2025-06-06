const { createLogger, transports, format } = require('winston');
const path = require('path');
 
const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join('logs', 'error.log') }), 
    new transports.Console() 
  ],
});

module.exports = logger;
