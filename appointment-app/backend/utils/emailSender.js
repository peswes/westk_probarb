const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // your Gmail address
    pass: process.env.EMAIL_PASS,       // Gmail App Password
  },
});

const sendApprovalEmail = async (to, appointment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Appointment Approved',
    text: `Hi ${appointment.name}, your appointment on ${appointment.date} at ${appointment.time} has been approved.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
  }
};

module.exports = { sendApprovalEmail };
