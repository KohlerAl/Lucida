"use strict";
// This client mirrors the movement of the box
var prototype09;
(function (prototype09) {
    let socket = new WebSocket("wss://agkeia.herokuapp.com/");
    socket.addEventListener("message", handleMessage);
    function handleMessage(_event) {
        console.log(_event.data);
    }
})(prototype09 || (prototype09 = {}));
//# sourceMappingURL=client2.js.map