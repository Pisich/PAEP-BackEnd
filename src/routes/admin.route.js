const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

//router.get('/', handleError(async (req, res) => {
//  const quote = await quotesController.getTechnologyQuote();
//  res.send({quote, users: userController.list()});
//}));

module.exports = router;