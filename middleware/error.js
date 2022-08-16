const winston = require('winston');
const { createLogger, format } = require('winston');
const { prettyPrint, timestamp, colorize, combine } = format;
require('winston-mongodb');

module.exports = function (err, req, res, next) {
  const logger = createLogger({
    level: 'error',
    format: combine(
      prettyPrint(),
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss |',
      }),
      colorize()
    ),
    transports: [
      new winston.transports.File({ filename: 'errorLog.log' }),
      new winston.transports.MongoDB({
        db: process.env.MONGODB_CONNECTION,
        options: { useUnifiedTopology: true },
      }),
    ],
  });
  logger.error(err.message, err);
  res.status(500).send('Something went wrong');
};
