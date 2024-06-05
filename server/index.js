const express = require("express");
const { Server } = require("socket.io");
const socketHandlers = require("./handlers/socketHandlers");

const app = express();
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: true
});

const emailToSocketId = new Map();
const socketIdToEmail = new Map();

io.on("connection", socket => {
  console.log("socket connected: ", socket.id);
  socketHandlers(io, socket, emailToSocketId, socketIdToEmail);
})

app.get("/", (req, res) => {
  res.send("hello");
})

server.listen(8000, () => console.log("server running!!"));