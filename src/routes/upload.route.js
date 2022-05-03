const express = require('express');
const router = express.Router();
const uploadGCS = require('../utils/multer');

router.post('/poliza', uploadGCS.single('poliza'), (req, res) => {
  console.log(req.file);
  // Save in DB
  res.redirect('/profile');
});

module.exports = router;