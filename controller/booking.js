const Booking = require('../model/booking');
const Table = require('../model/table');
const Counter = require('../model/counter'); // the counter model

// Make a new booking
exports.createBooking = async (req, res) => {
  const {size, tableIds,seats ,totalBill} = req.body;
const newTime=new Date();
  try {
    // Check for table availability
    // let availableTables = [];
    // for (let tableId of preferredTables) {
    //   const table = await Table.findOne({ tableId });
    //   if (!table.isBooked || new Date(table.bookedTime) > new Date(endTime)) {
    //     availableTables.push(tableId);
    //   }
    // }

    // if (availableTables.length < preferredTables.length) {
    //   return res.status(400).json({ message: "Some tables are already booked!" });
    // }

    // Create new booking
    // const totalBill = availableTables.length * 50;  // Assuming a rate of $50 per table

    const oneHourBefore = new Date(newTime.getTime() - 3 * 60 * 60 * 1000);
const oneHourAfter = new Date(newTime.getTime() + 1 * 60 * 60 * 1000);


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
// Check if any seat from the frontend matches the booked seats
let seatConflict = false;
let conflictingSeat = null;

for (let booking of bookingsInRange) {
  for (let seat of booking.seats) {
    if (seats.includes(seat)) {
      seatConflict = true;
      conflictingSeat = seat;
      break; // Exit inner loop if conflict found
    }
  }
  if (seatConflict) break; // Exit outer loop if conflict found
}
if (seatConflict) {
  console.log(`Error: Seat ${conflictingSeat} is already booked in the selected time range.`);
  res.status(202).json({ message: "one or more table is booked",result:initialBookings});
} else {
   
    const counter = await Counter.findOneAndUpdate(
      { name: 'userId' }, // this will ensure you have one counter document for userId
      { $inc: { value: 1 } }, // increment the counter
      { new: true, upsert: true } // upsert option will create if it doesn't exist
  );
    const booking = new Booking({ 
      bookingId:counter.value,
      groupId:counter.value+10000,
      size,
      tableIds,
      seats,
      startTime:newTime,
      totalBill
    });

    await booking.save();
    
    // Update the table's booking status
    // for (let tableId of availableTables) {
    //   await Table.updateOne({ tableId }, { isBooked: true, bookedTime: startTime, groupId });
    // }

    res.status(201).json({ message: 'Booking successful', booking });
  }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
