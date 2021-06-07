"use strict";
var prototype10_One;
(function (prototype10_One) {
    prototype10_One.allImg = [];
    prototype10_One.allPlanets = [];
    prototype10_One.allUFOs = [];
    prototype10_One.ufoLaserpoints = [];
    prototype10_One.rocketLaserpoints = [];
    prototype10_One.ufoBallIndex = 0;
    let planetIndex = 0;
    let ufoIndex = 0;
    let rocketBallIndex = 0;
    let lanes = ["right", "right", "left", "left", "middle"];
    window.addEventListener("load", handleLoad);
    window.addEventListener("deviceorientation", handleMove);
    function handleLoad() {
        /* const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start(); */
        prototype10_One.rocketImg = document.querySelector("#normal");
        prototype10_One.rocketImgO = document.querySelector("#damageOne");
        prototype10_One.rocketImgT = document.querySelector("#damageTwo");
        prototype10_One.ufoImg = document.querySelector(".ufo");
        let planetImgs = document.querySelectorAll(".planet");
        for (let i = 0; i < planetImgs.length; i++) {
            prototype10_One.allImg.push(planetImgs[i]);
        }
        prototype10_One.canvasBarrel = document.querySelector("#barrelCanvas");
        prototype10_One.ctxBarrel = prototype10_One.canvasBarrel.getContext("2d");
        prototype10_One.canvasPoint = document.querySelector("#pointCanvas");
        prototype10_One.ctxPoint = prototype10_One.canvasPoint.getContext("2d");
        prototype10_One.canvasPlanet = document.querySelector("#canvasPlanet");
        prototype10_One.ctxPlanet = prototype10_One.canvasPlanet.getContext("2d");
        prototype10_One.canvasRocket = document.querySelector("#rocketCanvas");
        prototype10_One.ctxRocket = prototype10_One.canvasRocket.getContext("2d");
        prototype10_One.canvasUfo = document.querySelector("#canvasUfo");
        prototype10_One.ctxUfo = prototype10_One.canvasUfo.getContext("2d");
        let html = document.querySelector("html");
        prototype10_One.width = html.clientWidth;
        prototype10_One.height = html.clientHeight;
        prototype10_One.canvasPlanet.setAttribute("width", prototype10_One.width + "px");
        prototype10_One.canvasPlanet.setAttribute("height", prototype10_One.height + "px");
        prototype10_One.canvasBarrel.setAttribute("width", prototype10_One.width + "px");
        prototype10_One.canvasBarrel.setAttribute("height", prototype10_One.height + "px");
        prototype10_One.canvasPoint.setAttribute("width", prototype10_One.width + "px");
        prototype10_One.canvasPoint.setAttribute("height", prototype10_One.height + "px");
        prototype10_One.canvasRocket.setAttribute("width", prototype10_One.width + "px");
        prototype10_One.canvasRocket.setAttribute("height", prototype10_One.height + "px");
        prototype10_One.canvasUfo.setAttribute("width", prototype10_One.width + "px");
        prototype10_One.canvasUfo.setAttribute("height", prototype10_One.height + "px");
        let startX = (prototype10_One.width / 2) - 25;
        let startY = (prototype10_One.height / 2) + 60;
        prototype10_One.rocket = new prototype10_One.Rocket(startX, startY, prototype10_One.rocketImg, prototype10_One.rocketImgO, prototype10_One.rocketImgT);
        prototype10_One.rocket.drawRocket();
        prototype10_One.barrel = new prototype10_One.Barrel(startX, startY, 0, prototype10_One.barrelImg);
        prototype10_One.barrel.draw();
        update();
    }
    function handleMove(_event) {
        if (_event.gamma) {
            prototype10_One.rocket.move(_event.gamma);
            prototype10_One.rocket.drawRocket();
        }
    }
    function update() {
        window.setInterval(movePlanets, 40);
        let random = getRandom(2000, 5000);
        window.setInterval(function () {
            let pos = getLane();
            createMoveable("planet", pos);
            random = getRandom(2000, 5000);
        }, random);
    }
    function createMoveable(_type, _xPos) {
        let randomNmbr = Math.floor(Math.random() * prototype10_One.allImg.length);
        let randomSize = getRandom(50, 120);
        if (_type == "planet") {
            let img = prototype10_One.allImg[randomNmbr];
            let planet = new prototype10_One.Planet(_xPos, -50, img, randomSize, planetIndex);
            planetIndex++;
            prototype10_One.allPlanets.push(planet);
        }
        else if (_type == "ufo") {
            let img = prototype10_One.ufoImg;
            let ufo = new prototype10_One.UFO(_xPos, -50, randomSize, randomSize, img, ufoIndex);
            ufoIndex++;
            prototype10_One.allUFOs.push(ufo);
        }
    }
    function getLane() {
        let numbr = Math.floor(Math.random() * lanes.length);
        let lane = lanes[numbr];
        let xPos;
        switch (lane) {
            case "right":
                let minRight = prototype10_One.width - prototype10_One.width / 3;
                let maxRight = prototype10_One.width - 20;
                xPos = getRandom(minRight, maxRight);
                break;
            case "left":
                let minLeft = -20;
                let maxLeft = prototype10_One.width / 3;
                xPos = getRandom(minLeft, maxLeft);
                break;
            case "middle":
                let minMiddle = prototype10_One.width / 3;
                let maxMiddle = prototype10_One.width - prototype10_One.width / 3;
                xPos = getRandom(minMiddle, maxMiddle);
                break;
            default:
                xPos = Math.floor(Math.random() * prototype10_One.width);
                break;
        }
        return xPos;
    }
    function getRandom(_min, _max) {
        let delta = _max - _min;
        let multiplied = Math.random() * delta;
        let floored = Math.floor(multiplied);
        let answer = floored + _min;
        return answer;
    }
    function movePlanets() {
        prototype10_One.ctxPlanet.clearRect(0, 0, prototype10_One.canvasPlanet.width, prototype10_One.canvasPlanet.height);
        for (let planet of prototype10_One.allPlanets) {
            planet.move(2);
            planet.draw(prototype10_One.ctxPlanet);
        }
        for (let ufo of prototype10_One.allUFOs) {
            ufo.move(2);
            ufo.draw(prototype10_One.ctxUfo);
        }
        prototype10_One.rocket.checkCollision();
        prototype10_One.ctxPoint.clearRect(0, 0, prototype10_One.canvasPoint.width, prototype10_One.canvasPoint.height);
        for (let ball of prototype10_One.ufoLaserpoints) {
            ball.move();
            ball.draw();
        }
    }
})(prototype10_One || (prototype10_One = {}));
//# sourceMappingURL=main_one.js.map