const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const userController = require('../controllers/user.controller')
const quotesController = require('../controllers/external.controller');
// const {createSchema, updateSchema} = require('../models/schemas/user.schema');
const {uploadLocal} = require('../utils/multer');
// path prefix /users

router.post('/profilePictureLocal', uploadLocal.single('profilePicture'), (req, res) => {
  const path = req.file.path.replace('src/', '');
  userController.saveProfilePicture(`https://backend-paep22.herokuapp.com/${path}`);
  res.send({url: `https://backend-paep22.herokuapp.com/${path}`});
});

router.get('/', handleError(async (req, res) => {
  const quote = await quotesController.getTechnologyQuote();
  res.send({quote, users: userController.list()});
}));

router.get('/getProfilePicture', (req, res) => {
  res.send({url: userController.getProfilePicture()});
});

router.get('/:username', handleError(async (req, res) => {
  const {username} = req.params;
  const user = await userController.get(username);
  res.send(user);
}));

// GET users/:username/locations
router.get('/:username/locations', handleError((req, res) => {
  const {username} = req.params;
  res.send(userController.getUserLocations(username));
}));

// POST users/ body(name, lastName, username)
router.post('/', handleError((req, res, next) => {
  const {body: {name, lastName, username}} = req;
  // const {error} = createSchema.validate({name, lastName, username});
  // if(error) return next(error);
  res.send(userController.create(name, lastName, username));
}));

// PUT users/:username body(name, lastName)
router.put('/:username', handleError((req, res, next) => {
  const {username} = req.params;
  const {body: {name, lastName}} = req;
  // const {error} = updateSchema.validate({name, lastName, username});
  // if(error) return next(error);
  res.send(userController.update(username, name, lastName));
}));

// DELETE users/:username
router.delete('/:username', handleError((req, res) => {
  const {username} = req.params;
  res.send(userController.delete(username));
}));

// PUT users/:username/addLocation/:name
router.put('/:username/addLocation/:name', handleError((req, res) => {
  const {username, name} = req.params;
  res.send(userController.addLocation(username, name));
}));

// PUT users/:username/removeLocation/:name
router.put('/:username/removeLocation/:name', handleError((req, res) => {
  const {username, name} = req.params;
  res.send(userController.removeLocation(username, name));
}));

module.exports = router;
