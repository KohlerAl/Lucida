"use strict";
var prototype03;
(function (prototype03) {
    //canvas Element and rendering context to draw on canvas
    let canvasPlanet;
    let canvasRocket;
    let ctxP;
    let ctxR;
    //width and height of the window
    let width;
    //The middle-position of the green box
    let startPos;
    let newPos;
    //The canvas will be divides in three "lanes". This is where the planets will be
    //When a new planet is created, a random lane is picked
    let lanes = ["right", "right", "left", "left", "middle"];
    //All images for the planets are pushed into an array
    let allImg = [];
    //To be able to access all Planets, they are pushed into an array
    prototype03.allPlanets = [];
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
        //Selecting the canvas and the rendering divs and assigning the values to the prepared variables
        canvasPlanet = document.querySelector("#planet");
        ctxP = canvasPlanet.getContext("2d");
        canvasRocket = document.querySelector("#rocket");
        ctxR = canvasRocket.getContext("2d");
        //To get the correct size of the screen, we select the html-Element and get its width and height
        let html = document.querySelector("html");
        width = html.clientWidth;
        prototype03.height = html.clientHeight;
        //To make the canvas as big as the screen, the width and height of the html are applied to it
        canvasPlanet.setAttribute("width", width + "px");
        canvasPlanet.setAttribute("height", prototype03.height + "px");
        canvasRocket.setAttribute("width", width + "px");
        canvasRocket.setAttribute("height", prototype03.height + "px");
        //Preparing the position of the box. The box should be in the middle, 
        //so we are dividing the width by two and subtracting half of the width the box will have
        startPos = (width / 2) - 25;
        newPos = startPos;
        //To prepare the canvas, a white rectangle is drawn on it covering the whole canvas
        //Then the box is drawn
        drawRectangle(startPos);
        getAllImg();
        update();
    }
    function getAllImg() {
        let allImages = document.querySelectorAll(".planet");
        for (let i = 0; i < allImages.length; i++) {
            allImg.push(allImages[i]);
        }
    }
    function update() {
        let random = getRandom(3000, 7000);
        window.setInterval(function () {
            createPlanet();
        }, random);
        window.setInterval(movePlanets, 40);
    }
    //Function called when the mobile device is moving
    function handleMove(_event) {
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas
            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            newPos = startPos + (_event.gamma * 2);
            //And the box is drawn
            drawRectangle(newPos);
        }
    }
    function drawRectangle(_startX) {
        ctxR.clearRect(0, 0, canvasRocket.width, canvasRocket.height);
        let _startY = prototype03.height / 2 + 60;
        let rocket = document.querySelector(".rocket");
        ctxR.drawImage(rocket, _startX, _startY, 50, 100);
    }
    function createPlanet() {
        let numbr = Math.floor(Math.random() * lanes.length);
        let lane = lanes[numbr];
        let xPos;
        switch (lane) {
            case "right":
                let minRight = width - width / 3;
                let maxRight = width - 20;
                xPos = getRandom(minRight, maxRight);
                break;
            case "left":
                let minLeft = -20;
                let maxLeft = width / 3;
                xPos = getRandom(minLeft, maxLeft);
                break;
            case "middle":
                let minMiddle = width / 3;
                let maxMiddle = width - width / 3;
                xPos = getRandom(minMiddle, maxMiddle);
                break;
            default:
                xPos = Math.floor(Math.random() * width);
                break;
        }
        let randomNmbr = Math.floor(Math.random() * allImg.length);
        let img = allImg[randomNmbr];
        let randomSize = getRandom(50, 120);
        let planet = new prototype03.Planet(xPos, -50, img, randomSize);
        prototype03.allPlanets.push(planet);
    }
    function getRandom(_min, _max) {
        let delta = _max - _min;
        let random = Math.random();
        let multiplied = random * delta;
        let floored = Math.floor(multiplied);
        let answer = floored + _min;
        return answer;
    }
    function movePlanets() {
        ctxP.clearRect(0, 0, canvasPlanet.width, canvasPlanet.height);
        for (let planet of prototype03.allPlanets) {
            planet.move(2);
            planet.draw(ctxP);
        }
    }
})(prototype03 || (prototype03 = {}));
//# sourceMappingURL=prototype03.js.map