const mongoose = require('mongoose');
const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
  },
  department: {
    type: String,
  },
  sub_department: {
    type: String,
  },
  on_contact: {
    type: Boolean,
  },
});

const User = mongoose.model('User', userModel);
module.exports = User;
