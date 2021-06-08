import * as WebSocket from "ws"; 

const port: number = Number(process.env.PORT); 

const server: WebSocket.Server = new WebSocket.Server({port: port}); 

const clientSockets: Set<WebSocket> = new Set(); 

interface Update {
    selector: string; 
    data: string; 
}

server.on("connection", (_socket: any) => {
    clientSockets.add(_socket); 

    _socket.on("message", (message: Update) => {
        for (let socket of clientSockets) {
            socket.send(message); 
        }
    }); 

    _socket.on("close", () => {
        clientSockets.delete(_socket); 
    }); 
}); 
