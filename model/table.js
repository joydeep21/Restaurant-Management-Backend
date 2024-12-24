const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableId: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
  bookedTime: { type: Date, default: null },
  groupId: { type: String, default: null }
});

module.exports = mongoose.model('BookedTable', tableSchema);
