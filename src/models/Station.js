const mongoose = require("mongoose");

const chargerSchema = new mongoose.Schema({
  type: { type: String, required: true },
  pricePerUnit: { type: Number, required: true },
  availableSlots: { type: Number, required: true },
}, { _id: false });

const stationSchema = new mongoose.Schema({
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
  chargers: [chargerSchema],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "inactive"],
    default: "pending",
  },
}, { timestamps: true });


module.exports = mongoose.model("Station", stationSchema);
