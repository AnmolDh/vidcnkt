const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const socketHandlers = require("./handlers/socketHandlers");
const { User } = require("./models/models");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = require("http").createServer(app);
const io = new Server(server, {
  cors: true,
});

mongoose.connect(process.env.MONGODB_URL);

const emailToSocketId = new Map();
const socketIdToEmail = new Map();

io.on("connection", (socket) => {
  console.log("socket connected: ", socket.id);
  socketHandlers(io, socket, emailToSocketId, socketIdToEmail);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password:hashedPassword });
  await user.save();
  const token = jwt.sign({ userId: email }, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(404).json({ success: false, error: "user not found" });
  }

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    return res.status(400).json({ success: false, error: "invalid password" });
  }

  const token = jwt.sign({ userId: email }, process.env.JWT_SECRET);
  res.json({ success: true, token });
})

server.listen(process.env.PORT, () => console.log("server running!!"));
