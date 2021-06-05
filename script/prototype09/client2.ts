// This client mirrors the movement of the box

namespace prototype09 {
    let socket: WebSocket = new WebSocket("wss://agkeia.herokuapp.com/"); 

    socket.addEventListener("message", handleMessage); 

    function handleMessage(_event: any): void {
        console.log(_event.data); 
    }
}