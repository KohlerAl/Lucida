"use strict";
var prototype02;
(function (prototype02) {
    //canvas Element and rendering context to draw on canvas
    let canvas;
    let ctx;
    //width and height of the window
    let width;
    let height;
    //The middle-position of the green box
    let startPos;
    let startPosY;
    // Installing a load- and a deviceorientation-Listener on window
    window.addEventListener("load", handleLoad);
    window.addEventListener("deviceorientation", handleMove);
    function handleLoad() {
        // create device motion/orientation manager
        const motionManager = new DeviceMotionAndOrientationManager();
        // create start screen and register device motion/orientation manager
        const startScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start();
        //The canvas and the rendering divs and assigning the values to the prepared variables
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        //To get the correct size of the screen, we select the html-Element and get its width and height
        let html = document.querySelector("html");
        width = html.clientWidth;
        height = html.clientHeight;
        //To make the canvas as big as the screen, the width and height of the html are applied to it
        canvas.setAttribute("width", width + "px");
        canvas.setAttribute("height", height + "px");
        //Preparing the position of the box. The box should be in the middle, 
        //so we are dividing the width by two and subtracting half of the width the box will have
        startPos = (width / 2) - 25;
        startPosY = height / 2 - 45;
        //To prepare the canvas, a white rectangle is drawn on it covering the whole canvas
        undoCanvas();
        //Then the box is drawn
        drawCanon(startPos, startPosY);
        drawCanonBarrel(startPos, startPosY);
    }
    //Function called when the mobile device is moving
    function handleMove(_event) {
        console.log("Mooooove");
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas
            undoCanvas();
            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            let rotation = _event.gamma / 0.5;
            drawCanonBarrel(startPos, startPosY, rotation);
            drawCanon(startPos, startPosY);
        }
    }
    function undoCanvas() {
        ctx.beginPath();
        ctx.fillStyle = "#777777";
        ctx.strokeStyle = "#777777";
        ctx.rect(0, 0, width, height);
        ctx.fill();
        ctx.closePath();
    }
    function drawCanon(_startX, _startY) {
        ctx.beginPath();
        ctx.strokeStyle = "darkgrey";
        ctx.fillStyle = "lightgrey";
        ctx.lineWidth = 10;
        ctx.arc(_startX, _startY, 50, 0, 1 * Math.PI, true);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "darkgrey";
        ctx.fillStyle = "grey";
        ctx.rect(_startX - 100, _startY, 200, 50);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    function drawCanonBarrel(_startX, _startY, _rotation = 0) {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.lineWidth = 2;
        ctx.arc(_startX, _startY - 50, 5, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.save();
        ctx.beginPath();
        ctx.translate(_startX, _startY - 55);
        if (_rotation > 90) {
            _rotation = 90;
        }
        else if (_rotation < 0) {
            _rotation = 0;
        }
        ctx.rotate(_rotation);
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.rect(0, 0, 100, 10);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
})(prototype02 || (prototype02 = {}));
//# sourceMappingURL=prototype02.js.map