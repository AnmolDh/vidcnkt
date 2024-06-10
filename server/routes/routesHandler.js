const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const authenticateToken = require("../handlers/authHandler");
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  const token = jwt.sign({ userId: email }, process.env.JWT_SECRET);
  res.json({ success: true, userId: email, token });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ success: false, error: "user not found" });
  }

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    return res.json({ success: false, error: "invalid password" });
  }

  const token = jwt.sign({ userId: email }, process.env.JWT_SECRET);
  res.json({ success: true, userId: email, token });
});

app.get("/protected", authenticateToken, (req, res) => {
  console.log("protected route working!!");
});

module.exports = app;
