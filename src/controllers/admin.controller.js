const {getJSON, saveJSON} = require('../utils/fileHelpers');
const {NotFoundError} = require('../utils/errors');

const Customer = require('../models/schemas/Customer');
const Poliza = require('../models/schemas/Poliza');
const Aseguradora = require('../models/schemas/Aseguradora');


const adminController = {
  getPolizaByNumber: function(identifier) {
    const data = getJSON();
    const index = data.users.findIndex(({username}) => username === identifier);
    return index;
  },
  getUserByTelefono: async function(identifier) {
    const user = await User.findById(identifier);
    return user;
  },
  getUserPolizas: function(username) {
    const data = getJSON();
    const user = this.get(username);
    const {locations = []} = user;
    return locations.map(index => data.locations[index]);
  },
  createUser: function(name, lastName, username) {
    const user = {name, lastName, username};
    const data = getJSON();
    data.users.push(user);
    saveJSON(data);
    return user;
  },
  updateUser: function(username, name, lastName) {
    const data = getJSON();
    const user = this.get(username);
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    const index = this.getIndex(username);
    if (index > 0) {
      data.users[index] = {...data.users[index], ...user};
      saveJSON(data);
      return data.users[index];
    }
    throw new NotFoundError(`user with the username: ${username}`)
  },
  deleteUser: function(username) {
    const data = getJSON();
    const index = this.getIndex(username);
    if (index >= 0) {
      const user = data.users.splice(index, 1);
      saveJSON(data);
      return user;
    }
    throw new NotFoundError(`user with the username ${username}`);
  },
  addPoliza: function(username, locationName) {
    const data = getJSON();
    const index = this.getIndex(username);
    const locationIndex = locationController.getIndex(locationName);
    if (index < 0 || locationIndex < 0) {
      return {};
    }
    const user = data.users[index];
    if (user.locations === undefined) user.locations = [];
    user.locations = [...user.locations, locationIndex];
    saveJSON(data);
    return user;
  },
  removePoliza: function(username, locationName) {
    const data = getJSON();
    const index = this.getIndex(username);
    const locationIndex = locationController.getIndex(locationName);
    if (index < 0 || locationIndex < 0) {
      return {};
    }
    const user = data.users[index];
    user.locations = user.locations.filter(index => index !== locationIndex);
    saveJSON(data);
    return user;
  },
  createPoliza: function(name, lastName, username) {
    const user = {name, lastName, username};
    const data = getJSON();
    data.users.push(user);
    saveJSON(data);
    return user;
  },
  updatePoliza: function(username, name, lastName) {
    const data = getJSON();
    const user = this.get(username);
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    const index = this.getIndex(username);
    if (index > 0) {
      data.users[index] = {...data.users[index], ...user};
      saveJSON(data);
      return data.users[index];
    }
    throw new NotFoundError(`user with the username: ${username}`)
  },
  deletePoliza: function(username) {
    const data = getJSON();
    const index = this.getIndex(username);
    if (index >= 0) {
      const user = data.users.splice(index, 1);
      saveJSON(data);
      return user;
    }
    throw new NotFoundError(`user with the username ${username}`);
  },
  createAseguradora: function(name, lastName, username) {
    const user = {name, lastName, username};
    const data = getJSON();
    data.users.push(user);
    saveJSON(data);
    return user;
  },
  updateAseguradora: function(username, name, lastName) {
    const data = getJSON();
    const user = this.get(username);
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    const index = this.getIndex(username);
    if (index > 0) {
      data.users[index] = {...data.users[index], ...user};
      saveJSON(data);
      return data.users[index];
    }
    throw new NotFoundError(`user with the username: ${username}`)
  },
  deleteAseguradora: function(username) {
    const data = getJSON();
    const index = this.getIndex(username);
    if (index >= 0) {
      const user = data.users.splice(index, 1);
      saveJSON(data);
      return user;
    }
    throw new NotFoundError(`user with the username ${username}`);
  }
};

module.exports = adminController;
