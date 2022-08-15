const express = require('express');
const { Genre } = require('../models/genre');
const router = express.Router();
const { Movie, validateMovie } = require('../models/movie');
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/async');

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
  })
);

router.post(
  '/',
  asyncMiddleware(auth, async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('genre not valid');

    const movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save();
    res.send(movie);
  })
);

router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('movie not found...');
    res.send(movie);
  })
);

router.put(
  '/:id',
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('invalid genre');
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    if (!movie) return res.status(404).send('movie not found...');
    movie.save();
    res.send(movie);
  })
);

router.delete(
  '/:id',
  auth,
  asyncMiddleware(async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('movie not found.....');
    res.send(movie);
  })
);
module.exports = router;
