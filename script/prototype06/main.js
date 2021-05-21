"use strict";
var prototype06;
(function (prototype06) {
    let startPos;
    let startPosY;
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
        prototype06.canvasBarrel = document.querySelector("#barrel");
        prototype06.ctxBarrel = prototype06.canvasBarrel.getContext("2d");
        prototype06.canvasPoint = document.querySelector("#point");
        prototype06.ctxPoint = prototype06.canvasPoint.getContext("2d");
        //To get the correct size of the screen, we select the html-Element and get its width and height
        let html = document.querySelector("html");
        prototype06.width = html.clientWidth;
        prototype06.height = html.clientHeight;
        //To make the canvas as big as the screen, the width and height of the html are applied to it
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
        window.setInterval(update, 40);
    }
    function handleMove(_event) {
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas
            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            barrel.move(_event.gamma);
            barrel.draw();
        }
    }
    function update() {
        barrel.draw();
        prototype06.ctxPoint.clearRect(0, 0, prototype06.canvasPoint.width, prototype06.canvasPoint.height + 150);
        for (let ball of allBalls) {
            ball.move();
            ball.draw();
        }
    }
    function getStart(_event) {
        let startX = startPos;
        let startY = startPosY - 50;
        let distance = 100;
        let x = distance * (Math.cos(barrel.rotation * Math.PI / 180));
        let y = distance * (Math.sin(barrel.rotation * Math.PI / 180));
        console.log(x, y);
        let endX = startX + x;
        let endY = startY + y;
        let ball = new prototype06.Ball(endX, endY);
        ball.getElevation(_event.clientX, _event.clientY);
        allBalls.push(ball);
    }
})(prototype06 || (prototype06 = {}));
//# sourceMappingURL=main.js.map