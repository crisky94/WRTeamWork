"use client"; // Necesario en Next.js App Router

import { useContext, useState } from "react";
import { ChatContext } from "@/context/ChatContext";

const ChatBox = () => {
    const { messages, sendMessage } = useContext(ChatContext);
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            sendMessage({ text: message, room: "coworking" });
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Chat en Tiempo Real</h2>
            <div className="text-white">
                {messages.map((msg, index) => (
                    <p key={index}>{msg.text}</p>
                ))}
            </div>
            <input
                className="text-black p-2"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSend}>Enviar</button>
        </div>
    );
};

export default ChatBox;
