const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    batteryCapacity: Number,
    vehicleNumber: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
    },

    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "owner", "user"],
      default: "user",
    },

    vehicles: [vehicleSchema],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
    },

    profileImage: { type: String }, 
    profileColor: { type: String }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
