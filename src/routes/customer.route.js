const express = require('express');
const router = express.Router();

const { handleError } = require('../utils/hof');
const { NotFoundError } = require('../utils/errors');
const customerController = require('../controllers/customer.controller');


//GET ALL customers
router.get('/', handleError(async (req, res) => {
  res.send(await customerController.get());
}));

// GET customer/:email
router.get('/:email', handleError(async (req, res) => {
  const { params: email } = req;
  const customerEmail = email.email;
  res.send(await customerController.getByEmail(customerEmail));
}));

//PUT customer
router.put('/', handleError(async (req, res) => {
  const body = req.body;
  const data = customerController.getByEmail(body.email);
  const name = body.name || data.name;
  const lastname = body.lastName || data.lastName;
  const telefono = body.descripcion || data.telefono;

  res.send(await customerController.update(name, lastname, body.email, telefono));
}));

// POST customer
router.post('/', handleError(async (req, res) => {
  const body = req.body;
  res.send(await customerController.create(body.name, body.lastName, body.email,
    body.telefono));
}));

// DELETE customer
router.delete('/:email', handleError(async (req, res) => {
  const { params: email } = req;
  const emaill = email.email;
  res.send(await customerController.delete(emaill));
}));

//ADD POLIZA
router.put('/addPoliza/:email', handleError(async (req, res) => {
  const { params: email } = req;
  const body = req.body;
  const emaill = email.email;
  const numberPoliza = body.numberPoliza;
  res.send(await customerController.addPoliza(emaill, numberPoliza));
}));

//REMOVE POLIZA
router.put('/removePoliza/:email', handleError(async (req, res) => {
  const { params: email } = req;
  const body = req.body;
  const emaill = email.email;
  const numberPoliza = body.numberPoliza;
  res.send(await customerController.removePoliza(emaill, numberPoliza));
}));



module.exports = router;
