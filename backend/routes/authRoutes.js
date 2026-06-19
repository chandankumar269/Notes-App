const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Note = require("../models/Note");
const protect = require("../middleware/authMiddleware");

const User = require("../models/User");

const router = express.Router();
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "No user exists. Please register yourself."
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(401).json({
      message: "Incorrect password"
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d"
    }
  );

  res.json({
    token,
    name: user.name,
    email: user.email
  });
});

module.exports = router;