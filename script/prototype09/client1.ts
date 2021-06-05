//This client sends the new position of the box

namespace prototype09 {
    let socket: WebSocket = new WebSocket("wss://agkeia.herokuapp.com/"); 
    window.addEventListener("deviceorientation", handleMove);

    function handleMove(_event: DeviceOrientationEvent): void {
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas
            undoCanvas();

            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            let newPos: number = startPos + (_event.gamma * 2);
            //And the box is drawn
            drawRectangle(newPos);
            sendPosition(newPos); 
        }
    }

    function sendPosition(_newPos: number): void {
        socket.send(JSON.stringify(_newPos)); 
    }
}