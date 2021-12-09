const app = require("express")();
const server = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chatMessageEvent", (message) => {
    io.emit("chatMessageEvent", message);
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});
