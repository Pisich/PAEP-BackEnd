const express = require('express');
const router = express.Router();

// path prefix /locations

// GET locations
router.get('/', (req, res) => {
  res.send(locationController.list());
});

// GET locations/:name
router.get('/:name', (req, res) => {
  const {name} = req.params;
  res.send(locationController.get(name));
});

// POST locations/ body(latitude, longitude, name)
router.post('/', (req, res) => {
  const {body: {longitude, latitude, name}} = req;
  res.send(locationController.create(latitude, longitude, name));
});

// PUT locations/:name body(latitude, longitude)
router.put('/:name', (req, res) => {
  const {params: {name}, body: {longitude, latitude}} = req;
  res.send(locationController.update(name, latitude, longitude));
});

// DELETE locations/:name
router.delete('/:name', (req, res) => {
  const {name} = req.params;
  res.send(locationController.delete(name));
});

module.exports = router;