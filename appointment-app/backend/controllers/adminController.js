const Admin = require('../models/Admin');
const Appointment = require('../models/Appointment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendApprovalEmail } = require('../utils/emailSender');
const { sendApprovalSms } = require('../utils/smsSender');

// Admin login controller
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('❌ Admin login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error('❌ Get appointments error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve a specific appointment
exports.approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.approved = true;
    await appointment.save();

    console.log('✅ Appointment approved:', appointment);

    // Send notifications
    await sendApprovalEmail(appointment.email, appointment);
    await sendApprovalSms(appointment.phone, appointment);

    // Return updated appointment so frontend can change "Pending" to "Approved"
    res.json({
      message: '✅ Appointment approved and notifications sent',
      updatedAppointment: appointment
    });
  } catch (err) {
    console.error('❌ Approve appointment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
