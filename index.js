const express = require('express');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');
const mongoose = require('mongoose');
const customer = require('./routes/customers');

require('dotenv').config();
const port = process.env.PORT || 3500;
const dbcon = process.env.MONGODB_CONNECTION;

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

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});