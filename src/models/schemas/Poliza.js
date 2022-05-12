const mongoose = require('mongoose');

const polizaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: false
  },
  productName: {
    type: String,
    minlength: 3,
    required: true
  },
  polizaNumber: {
    type: String,
    required: true
  },
  polizaUrl: {
    type: String,
    required: false
  },
  asegurado: {
    type: String,
    required: true
  },
  aseguradora: {
    type: mongoose.Types.ObjectId,
    ref: 'Aseguradora'
  },
  tipo: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  fechaVencimiento: {
    type: String,
    required: true
  }
});

const Poliza = mongoose.model('Poliza', polizaSchema);

module.exports = Poliza;
