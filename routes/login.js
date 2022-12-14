const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const asyncMiddleware = require('../middleware/async');

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send('Invalid email or password');

    const token = user.jwtTokenAuth();
    res.send(token);
  })
);

function validateLogin(login) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(10).max(100),
    password: Joi.string().required().min(5).max(1024),
  });
  return schema.validate(login);
}
module.exports = router;
