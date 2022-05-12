const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const { NotFoundError } = require('../utils/errors');
const userController = require('../controllers/user.controller');


// path prefix /user

// GET user/:email
router.get('/:email', handleError((req, res) => {
  const { params: email } = req;
  const userEmail = email.email;
  res.send(userController.getByEmail(userEmail));
}));

module.exports = router;
