// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";

// const app = express();
// const server = createServer(app);

// // Habilitar CORS en las rutas HTTP normales
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// // Habilitar CORS en WebSockets
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//         allowedHeaders: ["Content-Type"],
//         credentials: true
//     }
// });

// io.on("connection", (socket) => {
//     console.log("Usuario conectado:", socket.id);

//     socket.on("sendMessage", (message) => {
//         io.emit("receiveMessage", message);
//     });

//     socket.on("disconnect", () => {
//         console.log("Usuario desconectado:", socket.id);
//     });

// });

// server.listen(8000, () => {
//     console.log("Servidor corriendo en http://localhost:8000");
// });
import express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Aquí puedes poner tus rutas personalizadas si quieres

  // Esto sirve todas las demás rutas como páginas de Next
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
