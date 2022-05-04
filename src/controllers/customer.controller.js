const {NotFoundError} = require('../utils/errors');

const Customer = require('../models/schemas/Customer');
const Poliza = require('../models/schemas/Poliza');
const Aseguradora = require('../models/schemas/Aseguradora');

const customerController = {
  updateProfilePicture: function(email, url) {
    const customer = await User.findOneAndUpdate({email: email}, {profilePicUrl: url});
    return customer;
  },
  getProfilePicture: function(email) {
    const customer = await User.findOne({email: email});
    return customer.profilePicUrl;
  },
  get: function(email) {
    const customer = await User.findOne({email: email});
    if (customer === {}) throw new NotFoundError(`email ${email} not associated to any account`);
    return customer;
  },
  getUserPolizas: function(email) {
    const customer = await User.findOne({email: email}).populate('polizas');
    return customer.polizas;
  },
  create: function(name, lastName, email, telefono) {
    const customer = await Customer.create({
      name: name,
      lastName: lastName,
      email: email,
      telefono: telefono
    });
    return customer;
  },
  update: function(name, lastName, email, telefono) {
    const customer = await Customer.findOne({email: email})
    if (customer !== {}) {
      await Customer.findOneAndRemove({email: email});
      await Customer.create({name: name, lastName: lastName, email: email, telefono: telefono})
    }
    throw new NotFoundError(`email ${email} not associated to any account`);
  },
  delete: function(email) {
    const customer = await Customer.findOneAndRemove({email: email});
    if (customer === {}) {
    throw new NotFoundError(`email ${email} not associated to any account`);
    }
    return customer;
  },
  addPoliza: function(email, polizaNum) {
    const poliza = await Poliza.findOne({polizaNumber: polizaNum});
    await Customer.findOneAndUpdate({email: email}, { $push: {polizas: poliza}});
    return poliza;
  },
  removePoliza: function(email, poliza) {
    const poliza = await Poliza.findOne({polizaNumber: PolizaNum});
    await Customer.findOneAndUpdate({email: email}, { $pull: {polizas: poliza}});
    return user;
  }
};

module.exports = customerController;
