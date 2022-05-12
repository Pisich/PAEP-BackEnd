const { NotFoundError } = require('../utils/errors');

const Users = require('../models/schemas/Users.js');

const userController = {
  get: async function () {
    const user = await Users.find();
    return user;
  },
  getByEmail: async function (email) {
    const user = await Users.findOne({ email: email });
    console.log('user', user);
    if (user === null || user === {}){
      console.log('User not found');
      throw new NotFoundError(`User with email ${email} does not exist`);
    }
    return user;
  },
  create: async function (name, lastname, descripcion, puesto, imgLink, email) {
    const user = await Users.create({
      name: name,
      lastname: lastname,
      descripcion: descripcion,
      puesto: puesto,
      imgLink: imgLink,
      email: email
    });
    return user;
  },
  update: async function (name, lastname, descripcion, puesto, imgLink, email) {
    const user = await Users.findOne({ email: email });
    let new_user;
    if (user !== null && user !== {}) {
      new_user = await Users.findOneAndUpdate({ email: email }, {
        name: name,
        lastname: lastname,
        descripcion: descripcion,
        puesto: puesto,
        imgLink: imgLink,
        email: email
      }, {returnOriginal: false});
    } else throw new NotFoundError(`User ${email} not associated to any email`);
    return new_user;
  },
  delete: async function (email) {
    const user = await Users.findOneAndRemove({ email: email });
    if (user === null || user === {}) {
      throw new NotFoundError(`User ${email} not associated to any email`);
    }
    return user;
  }
};

module.exports = userController;
