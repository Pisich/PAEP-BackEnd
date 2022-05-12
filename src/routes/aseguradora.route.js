const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const { NotFoundError } = require('../utils/errors');
const aseguradoraController = require('../controllers/aseguradora.controller');

//GET aseguradora/
router.get('/', handleError(async (req, res) => {
  res.send(await aseguradoraController.get());
}));

//GET aseguradora/:nombre
router.get('/:nombre', handleError(async (req, res) => {
  const { params: nombre } = req;
  const nom = nombre.nombre;
  res.send(await aseguradoraController.getByNombre(nom));
}));

//POST aseguradora/
router.post('/', handleError(async (req, res) => {
  const body = req.body;
  res.send(await aseguradoraController.create(body.nombre, body.RFC, body.telefono));
}));

//PUT aseguradora/
router.put('/', handleError(async (req, res) => {
  const body = req.body;
  res.send(await aseguradoraController.update(body.nombre, body.RFC, body.telefono));
}));

//DELETE aseguradora/:RFC
router.delete('/:RFC', handleError(async (req, res) => {
  const { params: RFC } = req;
  const R = RFC.RFC;
  res.send(await aseguradoraController.delete(R));
}));

module.exports = router;