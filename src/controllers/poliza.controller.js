const { NotFoundError } = require('../utils/errors');
const mongoose = require('mongoose');

const Poliza = require('../models/schemas/Poliza');
const Aseguradora = require('../models/schemas/Aseguradora');


const polizaController = {
  get: async function (num) {
    const polizaa = await Poliza.findOne({ polizaNumber: num });
    if (polizaa === {}) throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
    return polizaa;
  },
  create: async function (filename, productName, polizaNumber, polizaUrl, asegurado, aseguradora, tipo) {
    const aseguradoraRef = await Aseguradora.findOne({ polizaNumber: aseguradora });
    const polizaa = await Poliza.create({
      filename: filename,
      productName: productName,
      polizaNumber: polizaNumber,
      polizaUrl: polizaUrl,
      asegurado: asegurado,
      aseguradora: aseguradoraRef,
      tipo: tipo
    });
    return polizaa;
  },
  update: async function (filename, productName, polizaNumber, polizaUrl, asegurado, aseguradora, tipo) {
    const polizaa = await Poliza.findOne({ polizaNumber: polizaNumber });
    const aseguradoraRef = await Aseguradora.findOne({ polizaNumber: aseguradora });
    if (polizaa !== {}) {
      await Poliza.findOneAndUpdate({ polizaNumber: polizaNumber }, {
        filename: filename,
        productName: productName,
        polizaNumber: polizaNumber,
        polizaUrl: polizaUrl,
        asegurado: asegurado,
        aseguradora: aseguradoraRef,
        tipo: tipo
      }, { useFindAndModify: false });
    }
    throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
  },
  delete: async function (num) {
    const polizaa = await Poliza.findOneAndRemove({ polizaNumber: num });
    if (polizaa === {}) {
      throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
    }
    return polizaa;
  }
};

module.exports = polizaController;