const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    station: { type: mongoose.Schema.Types.ObjectId, ref: "Station", required: true },
    date: { type: Date, required: true },
    slotTime: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 }, // renamed from cost
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
