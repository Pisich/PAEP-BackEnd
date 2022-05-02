const {getJSON, saveJSON} = require('../utils/fileHelpers');
const {NotFoundError} = require('../utils/errors');

const Customer = require('../models/schemas/Customer');
const Poliza = require('../models/schemas/Poliza');
const Aseguradora = require('../models/schemas/Aseguradora');

const userController = {
  saveProfilePicture: function(url) {
    const data = getJSON();
    data.profilePicutre = url;
    saveJSON(data);
  },
  getProfilePicture: function() {
    const data = getJSON();
    return data.profilePicutre || '';
  },
  list: function() {
    const data = getJSON();
    return data.users;
  },
  getIndex: function(identifier) {
    const data = getJSON();
    const index = data.users.findIndex(({username}) => username === identifier);
    return index;
  },
  get: async function(identifier) {
    const user = await User.findById(identifier);
    return user;
  },
  getUserLocations: function(username) {
    const data = getJSON();
    const user = this.get(username);
    const {locations = []} = user;
    return locations.map(index => data.locations[index]);
  },
  create: function(name, lastName, username) {
    const user = {name, lastName, username};
    const data = getJSON();
    data.users.push(user);
    saveJSON(data);
    return user;
  },
  update: function(username, name, lastName) {
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
  delete: function(username) {
    const data = getJSON();
    const index = this.getIndex(username);
    if (index >= 0) {
      const user = data.users.splice(index, 1);
      saveJSON(data);
      return user;
    }
    throw new NotFoundError(`user with the username ${username}`);
  },
  addLocation: function(username, locationName) {
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
  removeLocation: function(username, locationName) {
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
  }
};

module.exports = userController;
