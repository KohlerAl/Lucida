"use strict";
var prototype02;
(function (prototype02) {
    //canvas Element and rendering context to draw on canvas
    let canvas;
    let ctx;
    //The middle-position of the green box
    let startPos;
    let startPosY;
    let gamma = -90;
    let allBalls = [];
    // Installing a load- and a deviceorientation-Listener on window
    window.addEventListener("load", handleLoad);
    window.addEventListener("pointerup", getStart);
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
        prototype02.width = html.clientWidth;
        prototype02.height = html.clientHeight;
        //To make the canvas as big as the screen, the width and height of the html are applied to it
        canvas.setAttribute("width", prototype02.width + "px");
        canvas.setAttribute("height", prototype02.height + "px");
        //Preparing the position of the box. The box should be in the middle, 
        //so we are dividing the width by two and subtracting half of the width the box will have
        startPos = (prototype02.width / 2) - 25;
        startPosY = prototype02.height / 2 - 45;
        prototype02.div = document.querySelector("#box");
        //To prepare the canvas, a white rectangle is drawn on it covering the whole canvas
        undoCanvas();
        //Then the box is drawn
        drawCanon(startPos, startPosY);
        drawCanonBarrel(startPos, startPosY);
        window.setInterval(update, 40);
    }
    //Function called when the mobile device is moving
    function handleMove(_event) {
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas
            undoCanvas();
            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            let rotation = 270 + _event.gamma;
            if (rotation < 225) {
                rotation = 225;
            }
            else if (rotation > 315) {
                rotation = 315;
            }
            gamma = rotation;
            drawCanonBarrel(startPos, startPosY, rotation);
            drawCanon(startPos, startPosY);
        }
    }
    function undoCanvas() {
        ctx.beginPath();
        ctx.fillStyle = "#777777";
        ctx.strokeStyle = "#777777";
        ctx.rect(0, 0, prototype02.width, prototype02.height);
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
    function drawCanonBarrel(_startX, _startY, _rotation = 270) {
        ctx.save();
        ctx.translate(_startX - 5, _startY - 50);
        ctx.beginPath();
        ctx.rotate(_rotation * Math.PI / 180);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillStyle = "black";
        ctx.rect(0, 0, 100, 10);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    function getStart(_event) {
        let startX = startPos;
        let startY = startPosY - 50;
        let distance = 100;
        let x = distance * (Math.cos(gamma * Math.PI / 180));
        let y = distance * (Math.sin(gamma * Math.PI / 180));
        let endX = startX + x;
        let endY = startY + y;
        let ball = new prototype02.Ball(endX, endY);
        ball.getElevation(_event.clientX, _event.clientY);
        prototype02.div.innerHTML += "X: " + _event.clientX + "\n" + "Y: " + _event.clientY + "\n";
        allBalls.push(ball);
    }
    function update() {
        undoCanvas();
        drawCanon(startPos, startPosY);
        drawCanonBarrel(startPos, startPosY, gamma);
        for (let ball of allBalls) {
            ball.move();
            ball.draw(ctx);
        }
    }
})(prototype02 || (prototype02 = {}));
//# sourceMappingURL=prototype02.js.map