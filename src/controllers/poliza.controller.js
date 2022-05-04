const {NotFoundError} = require('../utils/errors');
const mongoose = require('mongoose');

const Poliza = require('../models/schemas/Poliza');

const polizaController = {
  get: async function(num) {
    const polizaa = await Poliza.findOne({polizaNumber: num});
    if (polizaa === {}) throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
    return polizaa;
  },
  create: async function(filename, productName, polizaNumber, polizaUrl) {
    const polizaa = await Poliza.create({
      filename: filename,
      productName: productName,
      polizaNumber: polizaNumber,
      polizaUrl: polizaUrl
    });
    return polizaa;
  },
  update: async function(filename, productName, polizaNumber, polizaUrl) {
    const polizaa = await Poliza.findOne({polizaNumber: polizaNumber})
    if (polizaa !== {}) {
      await Poliza.findOneAndRemove({polizaNumber: polizaNumber});
      await create(filename, productName, polizaNumber, polizaUrl)
    }
    throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
  },
  delete: async function(num) {
    const polizaa = await Poliza.findOneAndRemove({polizaNumber: num});
    if (polizaa === {}) {
    throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
    }
    return polizaa;
  }
};

module.exports = polizaController;