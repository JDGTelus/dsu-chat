const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const messagesService = require("./services/messagesService");

let connectionCount = 0;
let connectedUsers = 0;

// Middlewares

app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Templating engine setup

app.set("view engine", "ejs");

// Enpoints

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/messages", (req, res) => {
  res.json(messagesService.getMessagesHistory());
});

app.delete("/messages", (req, res) => {
  // "Empties" the existing messages.
  messagesService.clearMessages();
  io.emit("clearMessages");
  res.status(200).send();
});

// Socket section.

io.on("connection", (socket) => {
  connectionCount += 1;
  connectedUsers += 1;
  console.log(`New user connected, total connected: ${connectedUsers}`);
  socket.emit("setUserName", `User ${connectionCount}`);

  socket.on("chatMessageEmitted", ({ userName, message }) => {
    messagesService.addToMessageHistory({ userName, message });
    // Send event all other clients (as opposed to io.emit, which sends to all).
    socket.broadcast.emit("chatMessageEmitted", { userName, message });
  });

  socket.on("setUserName", (newName) => socket.emit("setUserName", newName));

  socket.on("disconnect", () => {
    connectedUsers -= 1;
    console.log(`User disconnected, total connected: ${connectedUsers}`);
  });
});

// Starting server.

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});
