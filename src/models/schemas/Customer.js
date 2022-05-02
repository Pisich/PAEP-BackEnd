const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
      },
      message: (props) => `${props.value} is not a valid email`
    }
  },
  telefono: {
    type: String,
    unique: true,
    required: true
  },
  polizas: [{type: mongoose.Types.ObjectId, ref: 'Poliza'}]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
