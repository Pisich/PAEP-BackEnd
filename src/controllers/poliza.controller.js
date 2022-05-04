const {NotFoundError} = require('../utils/errors');
const mongoose = require('mongoose');

const Poliza = require('../models/schemas/Poliza');

const polizaController = {
  get: async function(num) {
    const poliza = await Poliza.findOne({polizaNumber: num});
    if (poliza === {}) throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
    return poliza;
  },
  create: async function(filename, productName, polizaNumber, polizaUrl) {
    const poliza = await Poliza.create({
      filename: filename,
      productName: productName,
      polizaNumber: polizaNumber,
      polizaUrl: polizaUrl
    });
    return poliza;
  },
  update: async function(filename, productName, polizaNumber, polizaUrl) {
    const poliza = await Poliza.findOne({polizaNumber: polizaNumber})
    if (poliza !== {}) {
      await Poliza.findOneAndRemove({polizaNumber: polizaNumber});
      await this.create(filename, productName, polizaNumber, polizaUrl)
    }
    throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
  },
  delete: async function(num) {
    const poliza = await Poliza.findOneAndRemove({polizaNumber: num});
    if (poliza === {}) {
    throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
    }
    return poliza;
  }
};

module.exports = polizaController;