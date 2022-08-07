const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
      },
      isGold: {
        type: Boolean,
        required: false,
      },
      phone: {
        type: Number,
        required: true,
        min: 9800000000,
        max: 9899999999,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
        maxlength: 100,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateReturned: {
    type: Date, //set on server
  },
  rentalFee: {
    type: Number,
    min: 0,
    max: 10000000, //set on server
  },
});
const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
