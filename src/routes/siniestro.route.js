const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {handleError} = require('../utils/hof');
const {NotFoundError} = require('../utils/errors');
const siniestroController = require('../controllers/siniestro.controller');


// path prefix /siniestro

// GET siniestro/last24hrs
router.get('/last24hrs', handleError(async (req, res) => {
  let siniestros = await siniestroController.get();
  let sin24hr = [];
  for (const i of siniestros) {
    if ((Date.now() - parseInt(i.fecha)) <= 86400000) sin24hr.push(i);
  }
  res.send(sin24hr);
}));

// GET siniestro/:polizaNum
router.get('/:polizaNum', handleError(async (req, res) => {
  const {params: polizaNum} = req;
  res.send(await siniestroController.getByPolizaNumber(polizaNum.polizaNum));
}));

// POST siniestro
router.post('/', handleError(async (req, res) => {
  const body = req.body;
  res.send(await siniestroController.create(body.user_email, body.polizaTipo, body.polizaNombre,
    body.notas, body.polizaNumber));
}));

module.exports = router;