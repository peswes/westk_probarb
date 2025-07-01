const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');


router.post('/login', adminController.adminLogin);
router.get('/appointments', verifyToken, adminController.getAppointments);
router.put('/approve/:id', verifyToken, adminController.approveAppointment);

module.exports = router;


