const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth'); // THIS is what matters

router.get('/appointments', adminAuth, adminController.getAppointments);
router.put('/approve/:id', adminAuth, adminController.approveAppointment);
