const { Server } = require("socket.io");
const socketHandlers = require("./handlers/socketHandlers");

const io = new Server(8000, {
  cors: true
});

const emailToSocketId = new Map();
const socketIdToEmail = new Map();

io.on("connection", socket => {
  console.log("socket connected: ", socket.id);
  socketHandlers(io, socket, emailToSocketId, socketIdToEmail);
})