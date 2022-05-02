const mongoose = require('mongoose');

const aseguradoraSchema = new mongoose.Schema({
  RFC: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    unique: true,
    required: true
  }
});

const Aseguradora = mongoose.model('Aseguradora', aseguradoraSchema);

module.exports = Aseguradora;
