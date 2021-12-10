const app = require("express")();
const server = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(server);

let connectedUsers = 0;
let loginCounter = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  connectedUsers += 1;
  loginCounter += 1;
  console.log(`Logged in users: ${connectedUsers}`);

  socket.emit("setDefaultUserName", `User ${loginCounter}`);

  socket.on("chatMessageEvent", ({ userName, message }) => {
    socket.broadcast.emit("chatMessageEvent", { userName, message });
  });

  socket.on("disconnect", (param) => {
    connectedUsers -= 1;
    console.log(`Logged in users: ${connectedUsers}`);
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});
