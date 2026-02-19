const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const stationRoutes = require("./routes/stationRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger");

const app = express();

// --------------------
// Global Middlewares
// --------------------
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Swagger (MUST be before static)
// --------------------
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

// --------------------
// API Routes
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/bookings", bookingRoutes);

// --------------------
// Optional: Views (only if needed)
// --------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home", {
    title: "EV Booking API",
    description: "Welcome to EV Booking & User Management API",
  });
});

// --------------------
// Static Files (after Swagger)
// --------------------
app.use(express.static(path.join(__dirname, "public")));

// --------------------
// 404 JSON Handler (better for APIs)
// --------------------
app.use((req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }

  res.status(404).render("404", { title: "Page Not Found" });
});

module.exports = app;
