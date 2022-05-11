const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    puesto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imgLink: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Users = mongoose.model('Users', Userschema);

module.exports = Users;
