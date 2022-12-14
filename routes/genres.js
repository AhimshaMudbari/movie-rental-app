const express = require('express');
const { Genre, validateGenre } = require('../models/genre');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');

router.get(
  '/',
  asyncMiddleware(async (req, res, next) => {
    // throw new Error('Error is occuring haii');
    const genres = await Genre.find().sort('name');
    res.send(genres);
  })
);

router.post(
  '/',
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({
      name: req.body.name,
    });
    await genre.save();
    res.send(genre);
  })
);
router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('genre of that ID not found');
    res.send(genre);
  })
);

router.put(
  '/:id',
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre) return res.status(404).send('genre of given id not found');
    res.send(genre);
  })
);

router.delete(
  '/:id',
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('Genre of Id not found');
    res.send(genre);
  })
);

module.exports = router;
