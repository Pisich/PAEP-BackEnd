const mongoose = require('mongoose');

const siniestroSchema = new mongoose.Schema({
    user_email: {
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
    },
    polizaNumber: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    }
});

const Siniestros = mongoose.model('Siniestros', siniestroSchema);

module.exports = Siniestros;
