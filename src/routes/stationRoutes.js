const express = require("express");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  createStation,
  getStations,
} = require("../controllers/stationController");

const router = express.Router();

router.post("/", auth, authorize("owner"), createStation);
router.get("/", getStations);

module.exports = router;
