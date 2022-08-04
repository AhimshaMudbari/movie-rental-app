const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      lowercase: true,
    },
  })
);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
  });
  return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
