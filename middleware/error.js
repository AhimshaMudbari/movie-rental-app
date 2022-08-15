const winston = require('winston');
// const { createLogger, format } = require('winston');
// const { prettyPrint, timestamp, colorize } = format;

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  res.status(500).send('Something went wrong');
};
