const express = require("express");
const router = express.Router();
const { getAllUsers, getProfile, updateProfile } = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const upload = require("../utils/multer"); // memory storage multer

router.get("/", auth, authorize("admin"), getAllUsers);
router.get("/profile/me", auth, getProfile);
router.put("/profile/me", auth, upload.single("profileImage"), updateProfile);

module.exports = router;
