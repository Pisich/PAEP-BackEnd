const express = require('express');
const router = express.Router();
const uploadGCS = require('../utils/multer');
const polizaController = require('../controllers/poliza.controller');

router.post('/poliza', uploadGCS.single('poliza'), async (req, res) => {
  console.log(req.file);
  const body = req.body;
  console.log(body);
  const productName = body.productName;
  const asegurado = body.asegurado;
  const aseguradora = body.aseguradora;
  const tipo = body.tipo;
  await polizaController.create(
    req.file.filename,
    productName, Date.now(), req.file.path, asegurado, aseguradora, tipo);
  res.redirect('/');
});

module.exports = router;