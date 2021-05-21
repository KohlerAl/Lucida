"use strict";
var prototype06;
(function (prototype06) {
    let canvasBG;
    let ctxBG;
    let startPos;
    let startPosY;
    let gamma = -90;
    let barrel;
    let allBalls = [];
    window.addEventListener("load", handleLoad);
    window.addEventListener("pointerup", getStart);
    window.addEventListener("deviceorientation", handleMove);
    function handleLoad() {
        // create device motion/orientation manager
        /* const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        // create start screen and register device motion/orientation manager
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start(); */
        //The canvas and the rendering divs and assigning the values to the prepared variables
        canvasBG = document.querySelector("#background");
        ctxBG = canvasBG.getContext("2d");
        prototype06.canvasBarrel = document.querySelector("#barrel");
        prototype06.ctxBarrel = canvasBG.getContext("2d");
        prototype06.canvasPoint = document.querySelector("#point");
        prototype06.ctxPoint = canvasBG.getContext("2d");
        //To get the correct size of the screen, we select the html-Element and get its width and height
        let html = document.querySelector("html");
        prototype06.width = html.clientWidth;
        prototype06.height = html.clientHeight;
        //To make the canvas as big as the screen, the width and height of the html are applied to it
        canvasBG.setAttribute("width", prototype06.width + "px");
        canvasBG.setAttribute("height", prototype06.height + "px");
        prototype06.canvasBarrel.setAttribute("width", prototype06.width + "px");
        prototype06.canvasBarrel.setAttribute("height", prototype06.height + "px");
        prototype06.canvasPoint.setAttribute("width", prototype06.width + "px");
        prototype06.canvasPoint.setAttribute("height", prototype06.height + "px");
        //Preparing the position of the box. The box should be in the middle, 
        //so we are dividing the width by two and subtracting half of the width the box will have
        startPos = (prototype06.width / 2) - 25;
        startPosY = prototype06.height / 2 - 45;
        barrel = new prototype06.Barrel(startPos, startPosY, 270);
        barrel.draw();
        prototype06.div = document.querySelector("#box");
        //Then the box is drawn
        drawCanon(startPos, startPosY);
        window.setInterval(update, 40);
    }
    function handleMove(_event) {
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas
            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            barrel.move(_event.gamma);
            barrel.draw();
            drawCanon(startPos, startPosY);
        }
    }
    function drawCanon(_startX, _startY) {
        ctxBG.clearRect(0, 0, canvasBG.width, canvasBG.height + 150);
        ctxBG.beginPath();
        ctxBG.strokeStyle = "darkgrey";
        ctxBG.fillStyle = "lightgrey";
        ctxBG.lineWidth = 10;
        ctxBG.arc(_startX, _startY, 50, 0, 1 * Math.PI, true);
        ctxBG.stroke();
        ctxBG.fill();
        ctxBG.closePath();
        ctxBG.beginPath();
        ctxBG.strokeStyle = "darkgrey";
        ctxBG.fillStyle = "grey";
        ctxBG.rect(_startX - 100, _startY, 200, 50);
        ctxBG.fill();
        ctxBG.stroke();
        ctxBG.closePath();
    }
    function update() {
        barrel.draw();
        drawCanon(startPos, startPosY);
        for (let ball of allBalls) {
            ball.move();
            ball.draw();
        }
    }
    function getStart(_event) {
        let startX = startPos;
        let startY = startPosY - 50;
        let distance = 100;
        let x = distance * (Math.cos(gamma * Math.PI / 180));
        let y = distance * (Math.sin(gamma * Math.PI / 180));
        let endX = startX + x;
        let endY = startY + y;
        let ball = new prototype06.Ball(endX, endY);
        ball.getElevation(_event.clientX, _event.clientY);
        prototype06.div.innerHTML += "X: " + _event.clientX + "\n" + "Y: " + _event.clientY + "\n";
        allBalls.push(ball);
    }
})(prototype06 || (prototype06 = {}));
//# sourceMappingURL=main.js.map