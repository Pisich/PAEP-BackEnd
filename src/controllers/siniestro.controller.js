const { NotFoundError } = require('../utils/errors');
const mongoose = require('mongoose');

const Siniestro = require('../models/schemas/Siniestros');


const siniestroController = {
  get: async function () {
    const siniestro = await Siniestro.find();
    return siniestro;
  },
  getByUser: async function (email) {
    const siniestro = await Siniestro.find({user_email: email});
    console.log("email:", siniestro);
    return siniestro;
  },
  getByPolizaNumber: async function (num) {
    const siniestro = await Siniestro.findOne({ polizaNumber: num });
    if (siniestro === {} || siniestro === null) throw new NotFoundError(`Poliza number ${num} not associated to any Siniestro`);
    return siniestro;
  },
  create: async function (email, tipoPoliza, nombrePoliza, notas, polizaNumber) {
    const nota = ' ' || notas;
    const fecha = Date.now();
    const siniestro = await Siniestro.create({
      user_email: email,
      polizaTipo: tipoPoliza,
      polizaNombre: nombrePoliza,
      notas: nota,
      polizaNumber: polizaNumber,
      fecha: fecha
    });
    return siniestro;
  },
  update: async function (email, tipoPoliza, nombrePoliza, notas, polizaNumber) {
    const siniestro = await Siniestro.findOne({ polizaNumber: polizaNumber });
    const nota = ' ' || notas;
    if (siniestro !== {} && siniestro !== null) {
      await Siniestro.findOneAndUpdate({ polizaNumber: polizaNumber }, {
        user_email: email,
        polizaTipo: tipoPoliza,
        polizaNombre: nombrePoliza,
        notas: nota,
        polizaNumber: polizaNumber,
        fecha: fecha
      }, { useFindAndModify: false });
    }
    throw new NotFoundError(`Poliza number ${num} not associated to any siniestro`);
  },
  delete: async function (num) {
    const siniestro = await Siniestro.findOneAndRemove({ polizaNumber: num });
    if (siniestro === {} || siniestro === null) {
      throw new NotFoundError(`Poliza number ${num} not associated to any siniestro`);
    }
    return siniestro;
  }
};

module.exports = siniestroController;