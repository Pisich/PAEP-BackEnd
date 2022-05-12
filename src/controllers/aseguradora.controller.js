const { NotFoundError } = require('../utils/errors');
const mongoose = require('mongoose');

const Aseguradora = require('../models/schemas/Aseguradora');

const aseguradoraController = {
  get: async function () {
    const aseguradora = await Aseguradora.find();
    return aseguradora;
  },
  getByNombre: async function (nombre) {
    const aseguradora = await Aseguradora.findOne({
      nombre: nombre
    });
    if (aseguradora === {}) throw new NotFoundError(`${nombre
      } not found.`);
    return aseguradora;
  },
  create: async function (nombre, RFC, telefono) {
    const aseguradora = await Aseguradora.create({
      nombre: nombre,
      RFC: RFC,
      telefono: telefono
    });
    return aseguradora;
  },
  update: async function (nombre, RFC, telefono) {
    const aseguradora = await Aseguradora.findOne({ RFC: RFC })
    let aseg;
    if (aseguradora !== {}) {
      aseg = await Aseguradora.findOneAndUpdate({ RFC: RFC },
        {
          nombre: nombre,
          telefono: telefono
        }, {returnOriginal: false});
    } else throw new NotFoundError(`RFC ${RFC} not associated to any account`);
    return aseg;
  },
  delete: async function (RFC) {
    const aseguradora = await Aseguradora.findOneAndRemove({ RFC: RFC });
    if (aseguradora === {} || aseguradora === null) {
      throw new NotFoundError(`RFC ${RFC} not associated to any account`);
    }
    return aseguradora;
  }
};

module.exports = aseguradoraController;