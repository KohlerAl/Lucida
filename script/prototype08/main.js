"use strict";
var prototype08;
(function (prototype08) {
    let canvasPlanet;
    let ctxP;
    let canvasBall;
    //width and height of the window
    let width;
    //The canvas will be divided in three "lanes". This is where the planets will be
    //The middle lane has a lower chance of being picked
    //When a new planet is created, a random lane is picked
    let lanes = ["right", "right", "left", "left", "middle", "middle"];
    //All images for the planets are pushed into an array. We need those to draw them onto the canvas
    let allImg = [];
    let allUFOImg;
    //To be able to access all Planets, they are pushed into an array
    prototype08.allPlanets = [];
    prototype08.allUFOs = [];
    prototype08.ufoLaserpoints = [];
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
        prototype08.canvasRocket = document.querySelector("#rocket");
        prototype08.ctxR = prototype08.canvasRocket.getContext("2d");
        canvasBall = document.querySelector("#point");
        prototype08.ctxB = canvasBall.getContext("2d");
        //To get the correct size of the screen, we select the html-Element and get its width and height
        let html = document.querySelector("html");
        width = html.clientWidth;
        prototype08.height = html.clientHeight;
        //To make the canvas as big as the screen, the width and height of the html are applied to it
        canvasPlanet.setAttribute("width", width + "px");
        canvasPlanet.setAttribute("height", prototype08.height + "px");
        prototype08.canvasRocket.setAttribute("width", width + "px");
        prototype08.canvasRocket.setAttribute("height", prototype08.height + "px");
        canvasBall.setAttribute("width", width + "px");
        canvasBall.setAttribute("height", prototype08.height + "px");
        //Preparing the position of the rocket. Right now without any movement, the startPos and currentPos are the same
        let startPos = (width / 2) - 25;
        let startY = prototype08.height / 2 + 60;
        let img = document.querySelector("#normal");
        let img2 = document.querySelector("#damageOne");
        let img3 = document.querySelector("#damageTwo");
        prototype08.rocket = new prototype08.Rocket(startPos, startY, img, img2, img3);
        allUFOImg = document.querySelector(".ufo");
        //The rocket is drawn
        prototype08.rocket.drawRocket();
        //We can now acces all the images. We need to select them first
        getAllImg();
        //To create an Animation, we have to keep upadting the canvas
        update();
        prototype08.box = document.querySelector("#box");
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
        let random = getRandom(2000, 5000);
        window.setInterval(function () {
            createMoveable("planet");
            random = getRandom(1000, 3500);
        }, random);
        let randomUFO = getRandom(4000, 5000);
        window.setInterval(function () {
            createMoveable("ufo");
            randomUFO = getRandom(1000, 2000);
        }, randomUFO);
        //Every 40ms the image is updated 
        window.setInterval(movePlanets, 40);
        let randomLaserpoint = getRandom(10000, 12000);
        let ufoShoots = Math.floor(Math.random() * prototype08.allUFOs.length);
        window.setInterval(function () {
            console.log(prototype08.allUFOs.length, ufoShoots);
            prototype08.allUFOs[ufoShoots].shoot();
            randomLaserpoint = getRandom(10000, 12000);
        }, randomLaserpoint);
    }
    //Function called when the mobile device is moving
    function handleMove(_event) {
        //Check if the value we need is there
        if (_event.gamma) {
            prototype08.rocket.move(_event.gamma);
            prototype08.rocket.drawRocket();
        }
    }
    function createMoveable(_instance) {
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
        let randomSize = getRandom(50, 120);
        if (_instance == "planet") {
            let img = allImg[randomNmbr];
            let planet = new prototype08.Planet(xPos, -50, img, randomSize);
            prototype08.allPlanets.push(planet);
        }
        else if (_instance == "ufo") {
            let img = allUFOImg;
            let ufo = new prototype08.UFO(xPos, -50, randomSize, randomSize, img);
            prototype08.allUFOs.push(ufo);
        }
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
        for (let planet of prototype08.allPlanets) {
            planet.move(2);
            planet.draw(ctxP);
        }
        for (let ufo of prototype08.allUFOs) {
            ufo.move(2);
            ufo.draw(ctxP);
        }
        prototype08.rocket.checkCollision();
        prototype08.ctxB.clearRect(0, 0, canvasBall.width, canvasBall.height);
        for (let ball of prototype08.ufoLaserpoints) {
            ball.move();
            ball.draw();
        }
    }
})(prototype08 || (prototype08 = {}));
//# sourceMappingURL=main.js.map