"use strict";
var prototype01;
(function (prototype01) {
    let canvas;
    let ctx;
    let width;
    let height;
    let div;
    window.addEventListener("load", handleLoad);
    window.addEventListener("deviceorientation", handleMove);
    function handleLoad() {
        div = document.querySelector("#box");
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.style.width = width + "px";
        canvas.style.width = height + "px";
        undoCanvas();
        drawRectangle(width / 2 - 5);
    }
    function handleMove(_event) {
        div.innerHTML += " Gamma " + _event.gamma + "<br>";
        if (_event.gamma) {
            undoCanvas();
            drawRectangle(width / 2 + _event.gamma);
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
        ctx.beginPath();
        ctx.strokeStyle = "lightgreen";
        ctx.fillStyle = "lightgreen";
        ctx.rect(20, 20, 10, 20);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
})(prototype01 || (prototype01 = {}));
//# sourceMappingURL=prototype01.js.map