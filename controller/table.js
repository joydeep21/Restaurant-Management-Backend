const Table = require('../model/table');
const Tableavil = require('../model/availableTable');
const Booking = require('../model/booking');


// Get all tables
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new table
exports.createTable = async (req, res) => {
  const { tableId,capacity } = req.body;
  
  const seatLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const seats = Array.from({ length: capacity }, (_, i) => `${tableId}${seatLetters[i]}`);

  const table = new Tableavil({
    tableId,
    capacity,
    seats // Add seats to the table object
  });

  
  try {
    const newTable = await table.save();
    res.status(201).json({ message: 'Table created successfully', newTable });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBookedTable = async (req, res) => {
  // const {getTime1} = req.body;
  const newTime=new Date();
  // console.log("bhbfgbv",newTime);
  
  const oneHourBefore = new Date(newTime.getTime() - 5 * 60 * 60 * 1000);
const oneHourAfter = new Date(newTime.getTime() + 5* 60 * 60 * 1000);
  try {
    const allTable = await Tableavil.find();
    const bookingsInRange = await Booking.find({
      status: "booked",
      startTime: {
        $gte: oneHourBefore,
        $lt: oneHourAfter
      }
    }).exec();
    const initialBookings = {};

bookingsInRange.forEach(booking => {
    booking.tableIds.forEach(tableId => {
        // Filter seats that correspond to this table
        const tableSeats = booking.seats
            .filter(seat => seat.startsWith(tableId.toString())) // Match seat string with tableId
            .map(seat => seat.charCodeAt(seat.length - 1) - 97); // Convert seat letter to index (a -> 0, b -> 1, etc.)
        
        if (initialBookings[tableId]) {
            // If tableId already exists, merge the new seats
            initialBookings[tableId] = [...initialBookings[tableId], ...tableSeats];
        } else {
            // If tableId doesn't exist, create the entry
            initialBookings[tableId] = tableSeats;
        }
    });
});
    res.status(200).json({ message: 'Table data fetched successfully', allTable ,initialBookings});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
