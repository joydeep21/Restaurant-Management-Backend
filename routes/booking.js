const express = require('express');
const router = express.Router();
const bookingController = require('../controller/booking');

// Make a new booking
router.post('/', bookingController.createBooking);

module.exports = router;
