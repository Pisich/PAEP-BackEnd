const { NotFoundError } = require('../utils/errors');
const mongoose = require('mongoose');

const Poliza = require('../models/schemas/Poliza');
const Aseguradora = require('../models/schemas/Aseguradora');
const external = require('../controllers/external.controller');


const polizaController = {
  getAll: async function () {
    const polizaa = await Poliza.find();
    if (polizaa === {}) throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
    return polizaa;
  },
  get: async function (num) {
    const polizaa = await Poliza.findOne({ polizaNumber: num }).populate('aseguradora');
    if (polizaa === {}) throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
    return polizaa;
  },
  create: async function (filename, productName, polizaNumber, polizaUrl, asegurado, aseguradora, tipo) {
    const aseguradoraRef = await Aseguradora.findOne({ nombre: aseguradora });
    const venc = Date.now() + 432000000;
    const polizaa = await Poliza.create({
      filename: filename,
      productName: productName,
      polizaNumber: polizaNumber,
      polizaUrl: polizaUrl != "" ? await external.getShortenUrl(polizaUrl) : polizaUrl,
      asegurado: asegurado,
      aseguradora: aseguradoraRef,
      tipo: tipo,
      active: true,
      fechaVencimiento: venc
    });
    return polizaa;
  },
  update: async function (filename, productName, polizaNumber, polizaUrl, asegurado, aseguradora, tipo) {
    let updated;
    const polizaa = await Poliza.findOne({ polizaNumber: polizaNumber });
    const aseguradoraRef = await Aseguradora.findOne({ nombre: aseguradora });
    console.log("aseguradoraRef", aseguradoraRef);
    if (polizaa !== {}) {
      updated = await Poliza.findOneAndUpdate({ polizaNumber: polizaNumber }, {
        filename: filename,
        productName: productName,
        polizaNumber: polizaNumber,
        polizaUrl: polizaUrl,
        asegurado: asegurado,
        aseguradora: aseguradoraRef,
        tipo: tipo
      }, { returnOriginal: false }).populate('aseguradora');
    }
    else {
      throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
    }
    return updated;
  },
  delete: async function (num) {
    const polizaa = await Poliza.findOneAndRemove({ polizaNumber: num });
    if (polizaa === {}) {
      throw new NotFoundError(`Poliza number ${num} not associated to any poliza`);
    }
    return polizaa;
  },
  link: async function (nombreAseguradora, polizaNumber) {
    const aseg = await Aseguradora.findOne({ nombre: nombreAseguradora });
    if (aseg === null || aseg === {}) throw new NotFoundError(`Not found: ${nombreAseguradora}`);
    const poliza = Poliza.findOneAndUpdate({ polizaNumber: polizaNumber },
      { aseguradora: aseg }, { returnOriginal: false });
    return poliza;
  },
  addCampos: async function (polizaNumber, productName, asegurado, aseguradora, tipo) {
    const polizaa = await Poliza.findOne({ polizaNumber: polizaNumber });
    const aseguradoraRef = await Aseguradora.findOne({ nombre: aseguradora });
    if (polizaa !== {} && polizaa !== null) {
      await Poliza.findOneAndUpdate({ polizaNumber: polizaNumber }, {
        productName: productName,
        asegurado: asegurado,
        aseguradora: aseguradoraRef,
        tipo: tipo
      }, { returnOriginal: false }).populate('aseguradora');
    }
  }
};

module.exports = polizaController;