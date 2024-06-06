const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const socketHandlers = require("./handlers/socketHandlers");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = require("http").createServer(app);
const io = new Server(server, {
  cors: true
});

mongoose.connect(process.env.MONGODB_URL);

const emailToSocketId = new Map();
const socketIdToEmail = new Map();

io.on("connection", socket => {
  console.log("socket connected: ", socket.id);
  socketHandlers(io, socket, emailToSocketId, socketIdToEmail);
})

app.get("/", (req, res) => {
  res.send("hello");
})

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
})

server.listen(process.env.PORT, () => console.log("server running!!"));