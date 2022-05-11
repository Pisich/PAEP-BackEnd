const mongoose = require('mongoose');

const aseguradoraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  RFC: {
    type: String,
    unique: true,
    required: true
  },
  telefono: {
    type: String,
    required: true
  }
});

const Aseguradora = mongoose.model('Aseguradora', aseguradoraSchema);

module.exports = Aseguradora;
