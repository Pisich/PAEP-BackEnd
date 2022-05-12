const { NotFoundError } = require('../utils/errors');

const User = require('../models/schemas/Users.js');

const userController = {
  get: async function () {
    const user = await User.find();
    return user;
  },
  getByEmail: async function (email) {
    const user = await User.findOne({ email: email });
    console.log('user', user);
    if (user === null || user === {}){
      console.log('User not found');
      throw new NotFoundError(`User with email ${email} does not exist`);
    }
    return user;
  },
  create: async function (name, lastname, descripcion, puesto, imgLink, email) {
    const user = await User.create({
      name: name,
      lastname: lastname,
      descripcion: descripcion,
      puesto: puesto,
      imgLink: imgLink,
      email: email
    });
    return user;
  },
  update: async function (name, lastname, descripcion, puesto, imgLink) {
    const user = await User.findOne({ email: email });
    if (user !== null && user !== {}) {
      await Poliza.findOneAndUpdate({ email: email }, {
        name: name,
        lastname: lastname,
        descripcion: descripcion,
        puesto: puesto,
        imgLink: imgLink,
        email: email
      }, { useFindAndModify: false });
    }
    throw new NotFoundError(`User ${email} not associated to any email`);
  },
  delete: async function (email) {
    const user = await User.findOneAndRemove({ email: email });
    if (user === null || user === {}) {
      throw new NotFoundError(`User ${email} not associated to any email`);
    }
    return user;
  }
};

module.exports = userController;
