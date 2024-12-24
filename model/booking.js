const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: Number, required: true, unique: true},
  groupId: { type: Number, required: true,unique: true },
  size: { type: Number, required: true  },
  tableIds: [{ type: Number, required: true }],
  seats:[{ type: String,required: true }],
  startTime: { type: Date, required: true },
  totalBill: { type: Number, default: 0 },
  status:{ type: String,default: "booked" },

});

module.exports = mongoose.model('Booking', bookingSchema);
