import * as WebSocket from "ws"; 

const port: number = Number(process.env.PORT); 

const server: WebSocket.Server = new WebSocket.Server({port: port}); 

const clientSockets: Set<WebSocket> = new Set(); 



server.addEventListener("connection", handleConnect); 

function handleConnect(_socket: any): void {
    clientSockets.add(_socket); 

    _socket.on("message", (message: string) => {
        for (let socket of clientSockets) {
            socket.send(message); 
        }
    }); 

    _socket.on("close", () => {
        clientSockets.delete(_socket); 
    }); 
}
