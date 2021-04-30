"use strict";
var prototype01;
(function (prototype01) {
    let canvas;
    let ctx;
    let width;
    let height;
    let div;
    let lastPos;
    window.addEventListener("load", handleLoad);
    window.addEventListener("deviceorientation", handleMove);
    function handleLoad() {
        div = document.querySelector("#box");
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        width = window.innerWidth;
        canvas.setAttribute("width", width + "px");
        height = window.innerHeight;
        canvas.setAttribute("height", height + "px");
        console.log(width, height);
        lastPos = width / 3;
        undoCanvas();
        drawRectangle(width / 2);
    }
    function handleMove(_event) {
        if (_event.gamma) {
            undoCanvas();
            let newPos = lastPos + _event.gamma;
            drawRectangle(newPos);
        }
    }
    function undoCanvas() {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.rect(0, 0, width, height);
        ctx.fill();
        ctx.closePath();
    }
    function drawRectangle(_startX) {
        let _startY = height / 2 - 45;
        ctx.beginPath();
        ctx.strokeStyle = "lightgreen";
        ctx.fillStyle = "lightgreen";
        ctx.rect(_startX, _startY, 50, 70);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
})(prototype01 || (prototype01 = {}));
//# sourceMappingURL=prototype01.js.map