const Station = require("../models/Station");

exports.createStation = async (req, res) => {
  try {
    const { name, location, chargers } = req.body;

    if (!name || !location || !location.city || !location.address) {
      return res.status(400).json({ message: "Name, city, and address are required" });
    }

    const station = await Station.create({
      name,
      location,
      chargers: chargers || [],
      owner: req.user._id,
    });

    res.status(201).json(station);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

exports.getStations = async (req, res) => {
  try {
    const { city, owner, name, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (city) filter["location.city"] = { $regex: city, $options: "i" };
    if (name) filter.name = { $regex: name, $options: "i" };
    if (owner) filter.owner = owner;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Station.countDocuments(filter);

    const stations = await Station.find(filter)
      .populate("owner", "name email")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      pagination: {
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit),
      },
      stations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
