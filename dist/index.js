import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
const app = express();
const server = createServer(app); // ✅ Use Node's native HTTP server
const wss = new WebSocketServer({ server });
let clientsCount = 0;
// When a client connects
wss.on("connection", (ws) => {
    clientsCount++;
    console.log(`✅ Client connected. Total: ${clientsCount}`);
    ws.on("message", (data, isBinary) => {
        console.log("📩 Received:", data.toString());
        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.on("close", () => {
        clientsCount--;
        console.log(`❌ Client disconnected. Total: ${clientsCount}`);
    });
});
server.listen(8080, () => {
    console.log("🚀 Server running on http://localhost:8080");
    console.log("💬 WebSocket on ws://localhost:8080");
    cons
});
//# sourceMappingURL=index.js.map