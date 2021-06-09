import * as WebSocket from "ws";

const port: number = Number(process.env.PORT);

const server: WebSocket.Server = new WebSocket.Server({ port: port });

const clientSockets: Set<WebSocket> = new Set();

interface Update {
    selector: string;
    data: string;
}
let readyClient: number = 0; 

server.on("connection", (_socket: any) => {
    clientSockets.add(_socket);

    _socket.on("message", (message: Update) => {
        const carrierMessage: Update = <Update>JSON.parse(message.toString());
        const selector: string = carrierMessage.selector;
        if (selector == "ready") {
            readyClient++; 
            if (readyClient == 2) {
                let update: Update = {
                    selector: "start", 
                    data: ""
                }
                _socket.send(update)
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
