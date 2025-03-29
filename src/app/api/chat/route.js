import { NextResponse } from "next/server";
import { Server } from "socket.io";
import { connectRedis, client } from "@/lib/redis";

let io;

export async function GET() {
    if (!io) {
        io = new Server(3001, {
            cors: { origin: "http://localhost:3000" }
        });

        await connectRedis();

        io.on("connection", (socket) => {
            console.log("✅ Nuevo usuario conectado:", socket.id);

            socket.on("sendMessage", async (data) => {
                await client.rPush(`messages:${data.room}`, JSON.stringify(data));
                io.to(data.room).emit("receiveMessage", data);
            });

            socket.on("joinRoom", (room) => {
                socket.join(room);
            });

            socket.on("disconnect", () => {
                console.log("🚪 Usuario desconectado:", socket.id);
            });
        });
    }

    return NextResponse.json({ status: "Socket Server Running" });
}
