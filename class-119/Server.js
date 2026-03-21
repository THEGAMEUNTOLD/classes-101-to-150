import App from "./src/App.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(App);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("New user connected");

    // Listen for messages from this socket
    socket.on("sendMessage", (msg) => {
        console.log("Message received: ", msg);

        // 1. Send only to this user
        socket.emit("messageToUser", `You said: ${msg}`);

        // 2. Send to everyone except sender
        socket.broadcast.emit("messageToOthers", `A user says: ${msg}`);

        // 3. Send to everyone including sender
        io.emit("messageToAll", `Everyone sees: ${msg}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        socket.broadcast.emit("messageToAll", "A user left the chat");
    });

});

httpServer.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});


