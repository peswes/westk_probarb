// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const adminRoutes = require('./routes/admin');
const appointmentRoutes = require('./routes/appointment');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// JWT Verify Middleware (optional, you can export this for use in routes)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. Token missing.' });

  jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = decoded;
    next();
  });
};

// Routes
app.use('/api/admin', adminRoutes);          // Admin routes (protected with verifyToken inside routes if needed)
app.use('/api/appointment', appointmentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Appointment Booking API');
});

// Debug: Confirm Mongo URI is loaded
console.log('Mongo URI:', process.env.MONGODB_URI);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection failed:', err);
});
