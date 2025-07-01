const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
