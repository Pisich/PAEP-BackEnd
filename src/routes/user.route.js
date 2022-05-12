const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const { NotFoundError } = require('../utils/errors');
const userController = require('../controllers/user.controller');


// path prefix /user

// GET user/:email
router.get('/:email', handleError(async (req, res) => {
  const { params: email } = req;
  const userEmail = email.email;
  res.send(await userController.getByEmail(userEmail));
}));

//PUT user
router.put('/', handleError(async (req, res) => {
  const body = req.body;
  const data = userController.getByEmail(body.email);
  const name = body.name || data.name;
  const lastname = body.lastname || data.lastname;
  const descripcion = body.descripcion || data.descripcion;
  const puesto = body.puesto || data.puesto;
  const imgLink = body.imgLink || data.imgLink;
  
  res.send(await userController.update(name, lastname, descripcion,
    puesto, imgLink, body.email));
}));

module.exports = router;
