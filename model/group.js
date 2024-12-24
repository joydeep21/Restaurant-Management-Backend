const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupId: { type: String, required: true, unique: true },
  size: { type: Number, required: true },
  tableIds: [{ type: Number }]
});

module.exports = mongoose.model('Group', groupSchema);
