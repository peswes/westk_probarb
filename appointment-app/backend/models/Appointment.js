const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  category: String,
  date: Date,
  message: String,
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
