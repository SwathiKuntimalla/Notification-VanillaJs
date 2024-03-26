import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
 
    socket.on("new_user_login", (data) => {
        console.log("New user logged in", data.message);

        
        io.emit("new_user_login", { message: data.message });
    });
});

server.listen(3005, () => {
    console.log("Socket.io server is running on port 3005");
});
