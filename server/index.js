const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const socketHandlers = require("./handlers/socketHandlers");
const handleRoutes = require("./routes/routesHandler");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(handleRoutes);

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

server.listen(process.env.PORT, () => console.log("server running!!"));
