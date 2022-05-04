const mongoose = require('mongoose');

const polizaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    minlength: 3,
    required: true
  },
  polizaNumber: {
    type: String,
    unique: true,
    required: true
  },
  polizaUrl: {
    type: String,
    unique: true,
    required: true
  }
});

const Poliza = mongoose.model('Poliza', polizaSchema);

module.exports = Poliza;
