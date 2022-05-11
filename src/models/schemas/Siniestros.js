const mongoose = require('mongoose');

const siniestroSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    polizaTipo: {
        type: String,
        required: true
    },
    polizaNombre: {
        type: String,
        required: true
    },
    notas: {
        type: String,
        required: false
    }
});

const Siniestros = mongoose.model('Siniestros', siniestroSchema);

module.exports = Siniestros;
