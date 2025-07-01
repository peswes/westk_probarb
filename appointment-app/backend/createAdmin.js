const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    const username = 'admin';
    const plainPassword = 'admin123';  // <-- Choose your password here
    
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    
    const adminExists = await Admin.findOne({ username });
    if (adminExists) {
      console.log('Admin user already exists');
    } else {
      const admin = new Admin({ username, passwordHash });
      await admin.save();
      console.log('Admin user created');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}

createAdmin();
