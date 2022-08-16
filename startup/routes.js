const express = require('express');
const error = require('../middleware/error');
const user = require('../routes/users');
const login = require('../routes/login');
const customer = require('../routes/customers');
const movie = require('../routes/movies');
const rental = require('../routes/rentals');
const genres = require('../routes/genres');
const home = require('../routes/home');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/', home);
  app.use('/api/customers', customer);
  app.use('/api/movies', movie);
  app.use('/api/rentals', rental);
  app.use('/api/users', user);
  app.use('/api/login', login);

  app.use(error);
};
