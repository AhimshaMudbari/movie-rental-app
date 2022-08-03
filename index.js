const express = require('express');
const app = express();
const Joi = require('joi');
const genres = require('./routes/genres');
const home = require('./routes/home');
const mogoose = require('mongoose');
const { default: mongoose } = require('mongoose');

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

const movieSchema = new mongoose.Schema({
  name: { type: String },
  genre: String,
  date: { type: Date, default: Date.now },
  quality: [String],
  isReleased: Boolean,
});

const Movies = mongoose.model('Movies', movieSchema);

// async function createMovie() {
//   const movie = new Movies({
//     name: 'Alpha',
//     genre: 'Comedy',
//     quality: ['720p', '1080p'],
//     isReleased: true,
//   });
//   const result = await movie.save();
//   console.log(result);
// }
// createMovie();

async function getMovie() {
  const movie = await Movies.find({ isReleased: true })
    .sort({ name: 1 })
    .limit(3)
    .select(['name', 'genre']);
  console.log(movie);
}
getMovie();
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
