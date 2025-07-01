const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// POST /api/appointment
router.post('/', async (req, res) => {
  try {
    const { name, email_address, phone, category, date, message } = req.body;

    if (!name || !email_address || !phone || !category || !date || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const newAppointment = new Appointment({
      name,
      email: email_address,
      phone,
      category,
      date,
      message,
    });

    await newAppointment.save();
    return res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    console.error('Appointment booking error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
