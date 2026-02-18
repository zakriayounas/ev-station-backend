const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  createBooking,
  getMyBookings,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", auth, createBooking);
router.get("/my", auth, getMyBookings);

module.exports = router;
