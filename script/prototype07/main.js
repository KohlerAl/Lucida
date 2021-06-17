"use strict";
var prototype07;
(function (prototype07) {
    let canvasPlanet;
    let ctxP;
    //width and height of the window
    let width;
    //The canvas will be divided in three "lanes". This is where the planets will be
    //The middle lane has a lower chance of being picked
    //When a new planet is created, a random lane is picked
    let lanes = ["right", "right", "left", "left", "middle"];
    //All images for the planets are pushed into an array. We need those to draw them onto the canvas
    let allImg = [];
    //To be able to access all Planets, they are pushed into an array
    prototype07.allPlanets = [];
    let rocket;
    // Installing a load- and a deviceorientation-Listener on window
    window.addEventListener("load", handleLoad);
    window.addEventListener("deviceorientation", handleMove);
    function handleLoad() {
        // create device motion/orientation manager
        /* const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        // create start screen and register device motion/orientation manager
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start(); */
        //Selecting the canvas and the rendering divs and assigning the values to the prepared variables
        canvasPlanet = document.querySelector("#planet");
        ctxP = canvasPlanet.getContext("2d");
        prototype07.canvasRocket = document.querySelector("#rocket");
        prototype07.ctxR = prototype07.canvasRocket.getContext("2d");
        //To get the correct size of the screen, we select the html-Element and get its width and height
        let html = document.querySelector("html");
        width = html.clientWidth;
        prototype07.height = html.clientHeight;
        //To make the canvas as big as the screen, the width and height of the html are applied to it
        canvasPlanet.setAttribute("width", width + "px");
        canvasPlanet.setAttribute("height", prototype07.height + "px");
        prototype07.canvasRocket.setAttribute("width", width + "px");
        prototype07.canvasRocket.setAttribute("height", prototype07.height + "px");
        //Preparing the position of the rocket. Right now without any movement, the startPos and currentPos are the same
        let startPos = (width / 2) - 25;
        let startY = prototype07.height / 2 + 60;
        let img = document.querySelector(".rocket");
        rocket = new prototype07.Rocket(startPos, startY, img);
        //The rocket is drawn
        rocket.drawRocket();
        //We can now acces all the images. We need to select them first
        getAllImg();
        //To create an Animation, we have to keep upadting the canvas
        update();
        prototype07.box = document.querySelector("#box");
    }
    function getAllImg() {
        //All Images with the class planet are selected and pushed into the prepared Array
        let allImages = document.querySelectorAll(".planet");
        for (let i = 0; i < allImages.length; i++) {
            allImg.push(allImages[i]);
        }
    }
    function update() {
        //Every two to five seconds a new planet is drawn 
        let random = getRandom(1000, 3500);
        window.setInterval(function () {
            createPlanet();
            random = getRandom(1000, 3500);
        }, random);
        //Every 40ms the image is updated 
        window.setInterval(movePlanets, 40);
    }
    //Function called when the mobile device is moving
    function handleMove(_event) {
        //Check if the value we need is there
        if (_event.gamma) {
            rocket.move(_event.gamma);
            rocket.drawRocket();
        }
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
        let planet = new prototype07.Planet(xPos, -50, img, randomSize);
        prototype07.allPlanets.push(planet);
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
        for (let planet of prototype07.allPlanets) {
            planet.move(2);
            planet.draw(ctxP);
        }
        rocket.checkCollision();
    }
})(prototype07 || (prototype07 = {}));
//# sourceMappingURL=main.js.map