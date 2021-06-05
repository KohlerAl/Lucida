"use strict";
var prototype09;
(function (prototype09) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        // create device motion/orientation manager
        const motionManager = new DeviceMotionAndOrientationManager();
        // create start screen and register device motion/orientation manager
        const startScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start();
        //Selecting the canvas and the rendering divs and assigning the values to the prepared variables
        prototype09.canvas = document.querySelector("canvas");
        prototype09.ctx = prototype09.canvas.getContext("2d");
        //To get the correct size of the screen, we select the html-Element and get its width and height
        let html = document.querySelector("html");
        prototype09.width = html.clientWidth;
        prototype09.height = html.clientHeight;
        //To make the canvas as big as the screen, the width and height of the html are applied to it
        prototype09.canvas.setAttribute("width", prototype09.width + "px");
        prototype09.canvas.setAttribute("height", prototype09.height + "px");
        //Preparing the position of the box. The box should be in the middle, 
        //so we are dividing the width by two and subtracting half of the width the box will have
        prototype09.startPos = (prototype09.width / 2) - 25;
        //To prepare the canvas, a white rectangle is drawn on it covering the whole canvas
        undoCanvas();
        //Then the box is drawn
        drawRectangle(prototype09.startPos);
    }
    function undoCanvas() {
        prototype09.ctx.beginPath();
        prototype09.ctx.fillStyle = "white";
        prototype09.ctx.strokeStyle = "white";
        prototype09.ctx.rect(0, 0, prototype09.width, prototype09.height);
        prototype09.ctx.fill();
        prototype09.ctx.closePath();
    }
    prototype09.undoCanvas = undoCanvas;
    function drawRectangle(_startX) {
        let _startY = prototype09.height / 2 - 45;
        prototype09.ctx.beginPath();
        prototype09.ctx.strokeStyle = "lightgreen";
        prototype09.ctx.fillStyle = "lightgreen";
        prototype09.ctx.rect(_startX, _startY, 50, 50);
        prototype09.ctx.stroke();
        prototype09.ctx.fill();
        prototype09.ctx.closePath();
    }
    prototype09.drawRectangle = drawRectangle;
})(prototype09 || (prototype09 = {}));
//# sourceMappingURL=shared.js.map