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

module.exports = router;
