const express = require('express');
const { createLogger, format } = require('winston');
const { combine, prettyPrint, colorize } = format;

const app = express();
const winston = require('winston');
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('dotenv').config();

const port = process.env.PORT || 3500;

app.listen(port, () => {
  const logger = createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: combine(prettyPrint(), colorize()),
      }),
    ],
  });
  logger.info(`listening to port ${port}`);
});
