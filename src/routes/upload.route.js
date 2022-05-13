const express = require('express');
const router = express.Router();
const uploadGCS = require('../utils/multer');
const polizaController = require('../controllers/poliza.controller');

router.post('/poliza', uploadGCS.single('poliza'), async (req, res) => {
  console.log(req.file);
  await polizaController.create(
    req.file.filename,
    'Poliza Basica', Date.now(), req.file.path, "Alberto Meñique", 'Aseguradora Lopez', 'Tipo');
  res.redirect('/');
});

module.exports = router;