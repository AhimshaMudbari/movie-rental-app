const jwtToken = process.env.JWTSECRET;
const winston = require('winston');
module.exports = function () {
  if (!jwtToken) {
    winston.error('Fatal error: jwt secret key not defined');
    process.require('dotenv').config();
    process.exit(1);
  }
};
