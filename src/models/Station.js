const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    location: {
      address: String,
      city: String,
      lat: Number,
      lng: Number,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    chargers: [
      {
        type: String,
        pricePerUnit: Number,
        availableSlots: Number,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "inactive"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Station", stationSchema);
