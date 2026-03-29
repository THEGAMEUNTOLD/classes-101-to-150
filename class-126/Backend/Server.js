import "dotenv/config";
import app from "./src/App.js";
import http from "http";
import connectDB from "./src/Config/Database.js";
import { initSocket } from "./src/Sockets/Server.Socket.js";

const PORT = process.env.PORT || 8000;


const httpServer = http.createServer(app);

initSocket(httpServer);

connectDB()
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});