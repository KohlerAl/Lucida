"use strict";
var prototype01;
(function (prototype01) {
    let canvas;
    let ctx;
    let width;
    let height;
    const motionManager = new DeviceMotionAndOrientationManager();
    motionManager.onRotationRate = onRotationRate;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.style.width = width + "px";
        canvas.style.width = height + "px";
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.rect(20, 20, 10, 20);
        ctx.stroke();
    }
    function onRotationRate(_alpha, _beta, _gamma) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.rect(0, 0, width, height);
        ctx.stroke();
        alert("Rotation");
        alert(_alpha + _beta + _gamma);
    }
})(prototype01 || (prototype01 = {}));
//# sourceMappingURL=prototype01.js.map