const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { json } = require('express');
const asyncMiddleware = require('../middleware/async');

router.get(
  '/me',
  auth,
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    // JSON.stringify(user);
    res.send(user);
  })
);

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User(
      //       {
      //    name: req.body.name,
      //    email: req.body.email,
      //    password:req.body.password
      //   }
      _.pick(req.body, ['name', 'email', 'password'])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.jwtTokenAuth();
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
  })
);

module.exports = router;
