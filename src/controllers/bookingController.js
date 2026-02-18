const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(booking);
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("station");
  res.json(bookings);
};
