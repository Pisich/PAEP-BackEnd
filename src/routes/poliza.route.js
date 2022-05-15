const express = require('express');
const router = express.Router();

const { handleError } = require('../utils/hof');
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

//PUT Poliza
router.put('/', handleError(async (req, res) => {
  const body = req.body;
  const data = await polizaController.get(body.polizaNumber);
  const filename = "" || body.filename || data.filename;
  const polizaUrl = "" || body.polizaUrl || data.polizaUrl;
  const polizaNumber = body.polizaNumber || data.polizaNumber;
  const asegurado = body.asegurado || data.asegurado;
  const aseguradora = body.aseguradora || data.aseguradora;
  const tipo = body.tipo || data.tipo;
  const productName = body.productName || data.productName;

  res.send(await polizaController.update(filename, productName, polizaNumber, polizaUrl, asegurado, aseguradora, tipo));
}));

//DELETE POLIZA
router.delete('/', handleError(async (req, res) => {
  const body = req.body;
  res.send(await polizaController.delete(body.polizaNumber));
}));

//POST poliza/linkAseguradora
router.post('/linkAseguradora/:nombre', handleError(async (req, res) => {
  const { params: nombre } = req;
  const body = req.body;
  const nom = nombre.nombre;
  res.send(await polizaController.link(nom, body.polizaNumber));
}));

//POST poliza/addCampos
router.post('/addCampos/:polizaNumber', handleError(async (req, res) => {
  const { params: polizaNumber } = req;
  const num = polizaNumber.polizaNumber;
  const body = req.body;

  res.send(await polizaController.addCampos(num, body.productName, body.asegurado,
    body.aseguradora, body.tipo));
}));

module.exports = router;
