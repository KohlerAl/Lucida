"use strict";
//This client sends the new position of the box
var prototype09;
(function (prototype09) {
    let socket = new WebSocket("wss://agkeia.herokuapp.com/");
    window.addEventListener("deviceorientation", handleMove);
    function handleMove(_event) {
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas
            prototype09.undoCanvas();
            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            let newPos = prototype09.startPos + (_event.gamma * 2);
            //And the box is drawn
            prototype09.drawRectangle(newPos);
            sendPosition(newPos);
        }
    }
    function sendPosition(_newPos) {
        socket.send(JSON.stringify(_newPos));
    }
})(prototype09 || (prototype09 = {}));
//# sourceMappingURL=client1.js.map