const {NotFoundError} = require('../utils/errors');

const Customer = require('../models/schemas/Customer');
const Poliza = require('../models/schemas/Poliza');

const customerController = {
  updateProfilePicture: async function(email, url) {
    const customer = await Customer.findOneAndUpdate({email: email}, {profilePicUrl: url});
    return customer;
  },
  getProfilePicture: async function(email) {
    const customer = await Customer.findOne({email: email});
    return customer.profilePicUrl;
  },
  get: async function(email) {
    const customer = await Customer.findOne({email: email});
    if (customer === null) throw new NotFoundError(`email ${email} not associated to any account`);
    return customer;
  },
  getUserPolizas: async function(email) {
    const customer = await Customer.findOne({email: email}).populate('polizas');
    return customer.polizas;
  },
  create: async function(name, lastName, email, telefono) {
    const customer = await Customer.create({
      name: name,
      lastName: lastName,
      email: email,
      telefono: telefono
    });
    return customer;
  },
  update: async function(name, lastName, email, telefono) {
    const customer = await Customer.findOne({email: email})
    if (customer !== null) {
      await Customer.findOneAndRemove({email: email});
      await Customer.create({name: name, lastName: lastName, email: email, telefono: telefono})
    }
    throw new NotFoundError(`email ${email} not associated to any account`);
  },
  delete: async function(email) {
    const customer = await Customer.findOneAndRemove({email: email});
    if (customer === null) {
    throw new NotFoundError(`email ${email} not associated to any account`);
    }
    return customer;
  },
  addPoliza: async function(email, polizaNum) {
    const polizaz = await Poliza.findOne({polizaNumber: polizaNum});
    await Customer.findOneAndUpdate({email: email}, { $push: {polizas: poliza}});
    return polizaz;
  },
  removePoliza: async function(email, poliza) {
    const polizaz = await Poliza.findOne({polizaNumber: PolizaNum});
    await Customer.findOneAndUpdate({email: email}, { $pull: {polizas: poliza}});
  }
};

module.exports = customerController;
