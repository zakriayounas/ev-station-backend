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

// Middlewares
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  res.render("home", { title: "EV Booking API", description: "Welcome to EV Booking & User Management API" });
});

// Swagger docs
app.use(
  "/api/docs",
  helmet({ contentSecurityPolicy: false }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/bookings", bookingRoutes);

// 404 handler (should always be last)
app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

module.exports = app;
