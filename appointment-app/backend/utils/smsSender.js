const formatPhoneNumber = (phone) => {
  if (phone.startsWith('0')) {
    return '+234' + phone.slice(1);
  }
  return phone;
};

// Example usage
const toNumber = formatPhoneNumber('07043151234');  // +2347043151234


const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// This function must match the import name: sendApprovalSms
const sendApprovalSms = async (to, appointment) => {
  const message = `Hi ${appointment.name}, your appointment for ${appointment.date} at ${appointment.time} has been approved.`;

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to, // Example: '+2348012345678'
    });

    console.log(`✅ SMS sent to ${to}`);
  } catch (error) {
    console.error('❌ Failed to send SMS:', error.message);
  }
};

module.exports = { sendApprovalSms };
