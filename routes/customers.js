const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');

router.get('/', async (req, res) => {
  const customer = await Customer.find().sort('name');
  try {
    res.send(customer);
  } catch (e) {
    res.send(e.message);
  }
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customers = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  try {
    customers = await customers.save();
    res.send(customers);
  } catch (e) {
    res.send(e.message);
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer)
    return res.status(404).send('Customer of the given Id not found');
  try {
    res.send(customer);
  } catch (e) {
    res.send(e);
  }
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndDelete({ _id: req.params.id });
  if (!customer)
    return res.status(400).send('Customer of the given Id not found');
  try {
    res.send(customer);
  } catch (e) {
    res.send(e.message);
  }
});
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById({ _id: req.params.id });
  if (!customer) {
    return res.status(404).send('Customer of the given ID not found');
  }
  try {
    res.send(customer);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
