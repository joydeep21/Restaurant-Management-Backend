const express = require('express');
const router = express.Router();
const tableController = require('../controller/table');

// Fetch all tables
router.post('/getbookedTable', tableController.getBookedTable);

// Create a new table
router.post('/', tableController.createTable);

module.exports = router;
