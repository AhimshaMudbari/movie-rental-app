const express = require('express');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const router = express.Router();
const { Rental, validateRental } = require('../models/rental');
// const Fawn = require('fawn');
// require('dotenv').config();

// const con = process.env.MONGODB_FAWN;
// Fawn.init(con);

router.get('/', async (req, res) => {
  const rental = await Rental.find().sort('-dateOut');
  res.send(rental);
});

router.post('/', async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(404).send('Customer of the given ID not found');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send('Movie of the given ID not found');

  if (movie.numberInStock === 0)
    return res.status(400).send('there is no any movie in stock');
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  // try {
  //   new Fawn.Task()
  //     .save('rentals', rental)
  //     .update(
  //       'movies',
  //       {
  //         _id: movie._id,
  //       },
  //       {
  //         $inc: {
  //           numberInStock: -1,
  //         },
  //       }
  //     )
  //     .run();
  //   res.send(rental);
  // } catch (e) {
  //   res.status(500).send('something went wrong ', e);
  // }
  await rental.save();
  movie.numberInStock--;
  movie.save();
  res.send(rental);
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send('Rental with given ID not found');
  res.send(rental);
});

router.delete('/:id', async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  if (!rental) return res.status(404).send('Invalid rental ID');
  res.send(rental);
});
module.exports = router;
