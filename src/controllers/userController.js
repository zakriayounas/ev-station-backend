const User = require("../models/User");
const { uploadImageBuffer } = require("../utils/cloudinary");

exports.getAllUsers = async (req, res) => {
  try {
    const { status, role, name, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (role) filter.role = role;
    if (name) filter.name = { $regex: name, $options: "i" }; 
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await User.countDocuments(filter);

    const users = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); 

    res.json({
      pagination:{
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      },
      users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Get own profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update basic fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;

    // Update profile image if uploaded
    if (req.file) {
      const uploadedUrl = await uploadImageBuffer(req.file.buffer);
      user.profileImage = uploadedUrl;
    }

    // Update vehicles
    if (req.body.vehicles && Array.isArray(req.body.vehicles)) {
      user.vehicles = req.body.vehicles;
    }

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
