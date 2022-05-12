const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const { NotFoundError } = require('../utils/errors');
const polizaController = require('../controllers/poliza.controller');


// path prefix /poliza

// GET poliza/
router.get('/', handleError(async (req, res) => {
  res.send(await polizaController.getAll());
}));

// GET poliza/:polizaNumber
router.get('/:polizaNumber', handleError(async (req, res) => {
  const { params: polizaNumber } = req;
  const polizaNum = polizaNumber.polizaNumber;
  res.send(await polizaController.get(polizaNum));
}));

// POST poliza
router.post('/', handleError(async (req, res) => {
  const body = req.body;
  const filename = "" || body.filename;
  const polizaUrl = "" || body.polizaUrl;
  res.send(await polizaController.create(filename,
    body.productName, body.polizaNumber, polizaUrl,
    body.asegurado, body.aseguradora, body.tipo));
}));

//POST poliza/linkAseguradora
router.post('/linkAseguradora/:nombre', handleError(async (req, res) => {
  const { params: nombre } = req;
  const body = req.body;
  const nom = nombre.nombre;
  res.send(await polizaController.link(nom, body.polizaNumber));
}));
module.exports = router;
