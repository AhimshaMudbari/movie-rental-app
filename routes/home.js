const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/async');

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    await res.send('Movie rental app');
  })
);

module.exports = router;
