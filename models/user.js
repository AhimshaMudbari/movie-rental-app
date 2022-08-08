const { default: mongoose } = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtValue = process.env.JWTSECRET;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 100,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 51024,
  },
});

userSchema.methods.jwtTokenAuth = function () {
  const token = jwt.sign({ _id: this._id }, jwtValue);
  return token;
};
const User = mongoose.model('User', userSchema);

const complexity = {
  min: 5,
  max: 51024,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().min(10).max(100).required(),
    password: passwordComplexity(complexity),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
