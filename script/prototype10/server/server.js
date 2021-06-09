"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const port = Number(process.env.PORT);
const server = new WebSocket.Server({ port: port });
const clientSockets = new Set();
let readyClient = 0;
server.on("connection", (_socket) => {
    clientSockets.add(_socket);
    _socket.on("message", (message) => {
        const carrierMessage = JSON.parse(message.toString());
        const selector = carrierMessage.selector;
        if (selector == "ready") {
            readyClient++;
            if (readyClient == 2) {
                let update = {
                    selector: "start",
                    data: ""
                };
                _socket.send(update);
            }
        }
        for (let socket of clientSockets) {
            socket.send(message);
        }
    });
    _socket.on("close", () => {
        clientSockets.delete(_socket);
    });
});
//# sourceMappingURL=server.js.map