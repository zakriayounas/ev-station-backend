const Booking = require("../models/Booking");

// Create a new booking
exports.createBooking = async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    user: req.user._id,
  });
  res.status(201).json(booking);
};

// Get bookings for logged-in user with pagination & optional filtering
exports.getMyBookings = async (req, res) => {
  const { page = 1, limit = 10, status, date } = req.query;

  let filter = { user: req.user._id };
  if (status) filter.status = status;
  if (date) filter.date = new Date(date);

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Booking.countDocuments(filter);

  const bookings = await Booking.find(filter)
    .populate("station", "name city address") 
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  res.json({
    pagination: {
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    },
    bookings,
  });
};
