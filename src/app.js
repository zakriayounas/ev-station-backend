const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const stationRoutes = require("./routes/stationRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
