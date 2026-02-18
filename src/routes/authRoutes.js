const express = require("express");
const { register, login, googleAuthRedirect, googleAuthCallback } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/google", googleAuthRedirect);
router.get("/google/callback", googleAuthCallback);

module.exports = router;
