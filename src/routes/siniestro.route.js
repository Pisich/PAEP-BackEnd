const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const {handleError} = require('../utils/hof');
const { NotFoundError } = require('../utils/errors');
const siniestroController = require('../controllers/siniestro.controller');


// path prefix /siniestro

// GET siniestro/:polizaNum
router.get('/:polizaNum', handleError(async (req, res) => {
  const { params: polizaNum } = req;
  res.send(await siniestroController.getByPolizaNumber(polizaNum.polizaNum));
}));

// POST siniestro
router.post('/', urlencodedParser, handleError(async (req, res) => {
  const body = req.body;
  res.send(await siniestroController.create(body.user_email, body.polizaTipo, body.polizaNombre,
    body.notas, body.polizaNumber));
}));

module.exports = router;
