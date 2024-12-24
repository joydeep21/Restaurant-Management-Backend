const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableId: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  seats: { type: [String], required: true }, // Adding seats array
});

module.exports = mongoose.model('Table', tableSchema);
