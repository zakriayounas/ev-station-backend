const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const queryString = require("query-string");
const { getRandomColor } = require("../utils/helper");

exports.register = async (req, res) => {
  const { name, email, password, role, phone, vehicles } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    phone,
    vehicles,
    profileColor: getRandomColor(), 
  });

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
};


exports.googleAuthRedirect = (req, res) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };

  const url = `${rootUrl}?${queryString.stringify(options)}`;
  res.redirect(url); 
};


exports.googleAuthCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { id_token, access_token } = tokenResponse.data;

    // Get user info from Google
    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const { email, name, picture } = userInfo.data;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        role: "user",
        profileImage: picture,
        profileColor: getRandomColor(),
        status: "approved",
      });
    }

    // Generate JWT for your app
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    // Redirect frontend with token or set cookie
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send("Google OAuth failed");
  }
};
