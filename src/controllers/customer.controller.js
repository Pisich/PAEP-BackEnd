const {
  NotFoundError
} = require('../utils/errors');

const Customer = require('../models/schemas/Customer');
const Poliza = require('../models/schemas/Poliza');
const Users = require('../models/schemas/Users');

const customerController = {

  get: async function () {
    const customer = await Customer.find().populate('polizas');
    return customer;
  },
  getByEmail: async function (email) {
    const customer = await Customer.findOne({
      email: email
    }).populate('polizas');
    if (customer === null) throw new NotFoundError(`email ${email} not associated to any account`);
    return customer;
  },
  getUserPolizas: async function (email) {
    const customer = await Customer.findOne({
      email: email
    }).populate('polizas');
    return customer.polizas;
  },
  create: async function (name, lastName, email, telefono) {
    const customer = await Customer.create({
      name: name,
      lastName: lastName,
      email: email,
      telefono: telefono
    });
    return customer;
  },
  update: async function (name, lastName, email, telefono) {
    const customer = await Customer.findOne({
      email: email
    })
    let updated;
    if (customer !== null) {
      updated = await Customer.findOneAndUpdate({
        email: email
      },
        {
          name: name,
          lastName: lastName,
          email: email,
          telefono: telefono
        }, { returnOriginal: false });
    }
    else {
      throw new NotFoundError(`email ${email} not associated to any account`);
    }
    return updated;
  },
  delete: async function (email) {
    const customer = await Customer.findOneAndRemove({
      email: email
    });
    if (customer === null) {
      throw new NotFoundError(`email ${email} not associated to any account`);
    }
    return customer;
  },
  addPoliza: async function (email, polizaNum) {
    const poliza = await Poliza.findOne({
      polizaNumber: polizaNum
    });
    await Customer.findOneAndUpdate({
      email: email
    }, {
      $push: {
        polizas: poliza
      }
    });
    return poliza;
  },
  removePoliza: async function (email, polizaNum) {
    const poliza = await Poliza.findOne({
      polizaNumber: polizaNum
    });
    console.log("poliza", poliza);
    await Customer.findOneAndUpdate({
      email: email
    }, {
      $pull: {
        polizas: poliza._id
      }
    });
    return poliza;

  }
};

module.exports = customerController;