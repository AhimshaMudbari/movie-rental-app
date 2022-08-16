const mongoose = require('mongoose');
const dbcon = process.env.MONGODB_CONNECTION;
const winston = require('winston');
const { format, createLogger, info } = require('winston');
const { combine, timestamp, prettyPrint, colorize } = format;

module.exports = function () {
  mongoose
    .connect(dbcon, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      const logger = createLogger({
        format: combine(timestamp(), prettyPrint()),
        level: 'info',
        transports: [
          new winston.transports.File({ filename: 'dbLog.log' }),
          new winston.transports.Console(),
        ],
      });
      logger.info('connection successful');
    });
};
