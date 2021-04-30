"use strict";
var prototype01;
(function (prototype01) {
    let canvas;
    let ctx;
    let width;
    let height;
    let div;
    /*  const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
     motionManager.onAccelerationIncludingGravity = onAccelerationIncludingGravity;
     motionManager.onAcceleration = onAcceleration;
     motionManager.onRotationRate = onRotationRate;
     motionManager.onOrientation = onOrientation;
 
     const startScreen: StartScreen = new StartScreen("start-screen");
     startScreen.addResourceManager(motionManager);
     startScreen.start(); */
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
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.rect(20, 20, 10, 20);
        ctx.stroke();
    }
    function handleMove(_event) {
        div.innerHTML += _event.absolute;
        div.innerHTML += _event.alpha;
        div.innerHTML += _event.beta;
        div.innerHTML += _event.gamma;
    }
    /* function onRotationRate(_alpha: number, _beta: number, _gamma: number): void {
        /* ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.rect(0, 0, width, height);
        ctx.stroke();

        div.innerHTML = "onRotationRate";
    }

    function onAccelerationIncludingGravity(): void {
        div.innerHTML = "onAccelerationIncluding Gravity";
    }

    function onAcceleration(): void {
        div.innerHTML = "onAcceleration";
    }

    function onOrientation(): void {
        div.innerHTML = "onOrientation";
    } */
})(prototype01 || (prototype01 = {}));
//# sourceMappingURL=prototype01.js.map