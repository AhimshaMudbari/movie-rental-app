const express = require('express');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');
const mongoose = require('mongoose');
const customer = require('./routes/customers');
const movie = require('./routes/movies');
const rental = require('./routes/rentals');
const Joi = require('joi');
const user = require('./routes/users');
const login = require('./routes/login');
Joi.objectId = require('joi-objectid')(Joi);

require('dotenv').config();
const port = process.env.PORT || 3500;
const dbcon = process.env.MONGODB_CONNECTION;
const jwtToken = process.env.JWTSECRET;

if (!jwtToken) {
  console.log('Fatal error: jwt secret key not defined');
  process.exit(1);
}
mongoose
  .connect(dbcon)
  .then(() => {
    console.log('connection successful');
  })
  .catch((err) => console.log('could not connect to mongo dB', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);
app.use('/api/customers', customer);
app.use('/api/movies', movie);
app.use('/api/rentals', rental);
app.use('/api/users', user);
app.use('/api/login', login);
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
