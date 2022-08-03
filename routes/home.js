const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Movie rental app');
});

module.exports = router;
