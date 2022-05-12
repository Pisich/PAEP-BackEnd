const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const { NotFoundError } = require('../utils/errors');
const customerController = require('../controllers/customer.controller');


// path prefix /customer

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
  const lastname = body.lastname || data.lastname;
  const telefono = body.descripcion || data.telefono;
  
  res.send(await customerController.update(name, lastname, body.email,telefono));
}));

// POST customer
router.post('/', urlencodedParser, handleError(async (req, res) => {
    const body = req.body;
    res.send(await customerController.create(body.name, body.lastName, body.email,
        body.telefono));
}));

module.exports = router;
