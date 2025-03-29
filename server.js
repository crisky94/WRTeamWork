const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Habilitar CORS en las rutas HTTP normales
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Habilitar CORS en WebSockets
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Servidor corriendo en http://localhost:5000");
});
