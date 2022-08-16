const { format, createLogger } = require('winston');
const { timestamp, prettyPrint, combine, colorize } = format;
const winston = require('winston');
require('express-async-errors');

module.exports = function () {
  // process.on('uncaughtException', (ex) => {
  //   const logger = createLogger({
  //     format: combine(timestamp(), prettyPrint(), colorize()),
  //     transports: [
  //       new winston.transports.File({ filename: 'uncaughtException.log' }),
  //     ],
  //     level: 'error',
  //   });
  //   logger.error(ex.message, ex);
  //   process.exit(1);
  // });

  // process.on('unhandledRejection', (e) => {
  //   const logger = createLogger({
  //     format: combine(timestamp(), prettyPrint(), colorize()),
  //     transports: [
  //       new winston.transports.File({ filename: 'unhandledRejection.log' }),
  //     ],
  //     level: 'error',
  //   });
  //   logger.error(e.message, e);
  //   process.exit(1);
  // });

  process.on('uncaughtException', (e) => {
    const logger = winston.createLogger({
      format: combine(prettyPrint(), timestamp(), colorize()),
      exceptionHandlers: [new winston.transports.Console()],
    });
    logger.error(e);
    logger.exitOnError = true;
  });

  process.on('unhandledRejection', (e) => {
    const logger = winston.createLogger({
      format: combine(prettyPrint(), timestamp(), colorize()),
      rejectionHandlers: [new winston.transports.Console()],
    });
    logger.error(e);
    logger.exitOnError = true;
  });
};
