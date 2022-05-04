const {NotFoundError} = require('../utils/errors');
const mongoose = require('mongoose');

const Aseguradora = require('../models/schemas/Aseguradora');

const aseguradoraController = {
  get: function(RFC) {
    const aseguradora = await Aseguradora.findOne({RFC: RFC});
    if (aseguradora === {}) throw new NotFoundError(`RFC ${RFC} not associated to any account`);
    return aseguradora;
  },
  create: function(RFC, telefono) {
    const aseguradora = await Aseguradora.create({
      RFC: RFC,
      telefono: telefono
    });
    return aseguradora;
  },
  update: function(RFC, telefono) {
    const aseguradora = await Aseguradora.findOne({RFC: RFC})
    if (aseguradora !== {}) {
      await Aseguradora.findOneAndUpdate({RFC: RFC}, {telefono: telefono});
    }
    throw new NotFoundError(`RFC ${RFC} not associated to any account`);
  },
  delete: function(RFC) {
    const aseguradora = await Aseguradora.findOneAndRemove({RFC: RFC});
    if (aseguradora === {}) {
    throw new NotFoundError(`RFC ${RFC} not associated to any account`);
    }
    return aseguradora;
  }
};

module.exports = aseguradoraController;