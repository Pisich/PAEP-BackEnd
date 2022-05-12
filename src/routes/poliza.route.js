const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const { NotFoundError } = require('../utils/errors');
const polizaController = require('../controllers/poliza.controller');


// path prefix /poliza

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

module.exports = router;
