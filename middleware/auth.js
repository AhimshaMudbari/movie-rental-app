const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtValue = process.env.JWTSECRET;

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. token not provided');
  try {
    const decodedPayload = jwt.verify(token, jwtValue);
    req.user = decodedPayload;
    next();
  } catch (e) {
    res.status(400).send('invalid token');
  }
};
