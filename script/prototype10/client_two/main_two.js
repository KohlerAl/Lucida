"use strict";
var prototype10_Two;
(function (prototype10_Two) {
    let gamma = 90;
    prototype10_Two.allImg = [];
    prototype10_Two.allPlanets = [];
    prototype10_Two.allUFOs = [];
    prototype10_Two.ufoLaserpoints = [];
    prototype10_Two.rocketLaserpoints = [];
    prototype10_Two.ufoBallIndex = 0;
    let planetIndex = 0;
    let ufoIndex = 0;
    let rocketBallIndex = 0;
    let lanes = ["right", "right", "left", "left", "middle"];
    window.addEventListener("load", handleLoad);
    window.addEventListener("deviceorientation", handleMove);
    window.addEventListener("pointerup", handleTouch);
    let info;
    function handleLoad() {
        /* const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start(); */
        prototype10_Two.rocketImg = document.querySelector("#normal");
        prototype10_Two.rocketImgO = document.querySelector("#damageOne");
        prototype10_Two.rocketImgT = document.querySelector("#damageTwo");
        prototype10_Two.barrelImg = document.querySelector(".barrel");
        prototype10_Two.ufoImg = document.querySelector(".ufo");
        let planetImgs = document.querySelectorAll(".planet");
        for (let i = 0; i < planetImgs.length; i++) {
            prototype10_Two.allImg.push(planetImgs[i]);
        }
        prototype10_Two.canvasBarrel = document.querySelector("#barrelCanvas");
        prototype10_Two.ctxBarrel = prototype10_Two.canvasBarrel.getContext("2d");
        prototype10_Two.canvasPoint = document.querySelector("#pointCanvas");
        prototype10_Two.ctxPoint = prototype10_Two.canvasPoint.getContext("2d");
        prototype10_Two.canvasPlanet = document.querySelector("#canvasPlanet");
        prototype10_Two.ctxPlanet = prototype10_Two.canvasPlanet.getContext("2d");
        prototype10_Two.canvasRocket = document.querySelector("#rocketCanvas");
        prototype10_Two.ctxRocket = prototype10_Two.canvasRocket.getContext("2d");
        prototype10_Two.canvasUfo = document.querySelector("#canvasUfo");
        prototype10_Two.ctxUfo = prototype10_Two.canvasUfo.getContext("2d");
        let html = document.querySelector("html");
        prototype10_Two.width = html.clientWidth;
        prototype10_Two.height = html.clientHeight;
        prototype10_Two.canvasPlanet.setAttribute("width", prototype10_Two.width + "px");
        prototype10_Two.canvasPlanet.setAttribute("height", prototype10_Two.height + "px");
        prototype10_Two.canvasBarrel.setAttribute("width", prototype10_Two.width + "px");
        prototype10_Two.canvasBarrel.setAttribute("height", prototype10_Two.height + "px");
        prototype10_Two.canvasPoint.setAttribute("width", prototype10_Two.width + "px");
        prototype10_Two.canvasPoint.setAttribute("height", prototype10_Two.height + "px");
        prototype10_Two.canvasRocket.setAttribute("width", prototype10_Two.width + "px");
        prototype10_Two.canvasRocket.setAttribute("height", prototype10_Two.height + "px");
        prototype10_Two.canvasUfo.setAttribute("width", prototype10_Two.width + "px");
        prototype10_Two.canvasUfo.setAttribute("height", prototype10_Two.height + "px");
        prototype10_Two.startX = (prototype10_Two.width / 2) - 25;
        prototype10_Two.startY = (prototype10_Two.height / 2) + 60;
        prototype10_Two.rocket = new prototype10_Two.Rocket(prototype10_Two.startX, prototype10_Two.startY, prototype10_Two.rocketImg, prototype10_Two.rocketImgO, prototype10_Two.rocketImgT);
        prototype10_Two.rocket.drawRocket();
        prototype10_Two.barrel = new prototype10_Two.Barrel(prototype10_Two.startX, prototype10_Two.startY, 90, prototype10_Two.barrelImg);
        prototype10_Two.barrel.draw();
        info = document.querySelector("#info");
        update();
    }
    function handleMove(_event) {
        if (_event.gamma) {
            gamma = _event.gamma;
            prototype10_Two.barrel.move(_event.gamma);
            prototype10_Two.barrel.draw();
        }
    }
    function update() {
        window.setInterval(movePlanets, 40);
        let random = getRandom(2000, 5000);
        window.setInterval(function () {
            let pos = getLane();
            createMoveable("ufo", pos);
            random = getRandom(2000, 5000);
        }, random);
        let randomLaserpoint = getRandom(10000, 12000);
        let ufoShoots = Math.floor(Math.random() * prototype10_Two.allUFOs.length);
        window.setInterval(function () {
            console.log(prototype10_Two.allUFOs.length, ufoShoots);
            prototype10_Two.allUFOs[ufoShoots].shoot();
            randomLaserpoint = getRandom(10000, 12000);
        }, randomLaserpoint);
    }
    function createMoveable(_type, _xPos) {
        let randomNmbr = Math.floor(Math.random() * prototype10_Two.allImg.length);
        let randomSize = getRandom(50, 120);
        if (_type == "planet") {
            let img = prototype10_Two.allImg[randomNmbr];
            let planet = new prototype10_Two.Planet(_xPos, -50, img, randomSize, planetIndex);
            planetIndex++;
            prototype10_Two.allPlanets.push(planet);
        }
        else if (_type == "ufo") {
            let img = prototype10_Two.ufoImg;
            let ufo = new prototype10_Two.UFO(_xPos, -50, randomSize, randomSize, img, ufoIndex);
            ufoIndex++;
            prototype10_Two.allUFOs.push(ufo);
        }
    }
    function handleTouch(_event) {
        let distance = 100;
        let x = distance * (Math.cos(gamma * Math.PI / 180));
        let y = distance * (Math.sin(gamma * Math.PI / 180));
        let endX = prototype10_Two.rocket.newPos - 60 + x;
        let endY = prototype10_Two.rocket.startPosY - 100 + y;
        let ball = new prototype10_Two.Ball(endX, endY, rocketBallIndex, "lightgreen");
        rocketBallIndex++;
        ball.getElevation(_event.clientX, _event.clientY);
        ball.draw();
        console.log(x, y, endX, endY);
        prototype10_Two.rocketLaserpoints.push(ball);
        info.innerHTML += endX + "   " + endY + "    " + gamma + "    " + prototype10_Two.rocket.newPos + "\n";
        console.log("Pew pew");
    }
    function getLane() {
        let numbr = Math.floor(Math.random() * lanes.length);
        let lane = lanes[numbr];
        let xPos;
        switch (lane) {
            case "right":
                let minRight = prototype10_Two.width - prototype10_Two.width / 3;
                let maxRight = prototype10_Two.width - 20;
                xPos = getRandom(minRight, maxRight);
                break;
            case "left":
                let minLeft = -20;
                let maxLeft = prototype10_Two.width / 3;
                xPos = getRandom(minLeft, maxLeft);
                break;
            case "middle":
                let minMiddle = prototype10_Two.width / 3;
                let maxMiddle = prototype10_Two.width - prototype10_Two.width / 3;
                xPos = getRandom(minMiddle, maxMiddle);
                break;
            default:
                xPos = Math.floor(Math.random() * prototype10_Two.width);
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
        prototype10_Two.ctxPlanet.clearRect(0, 0, prototype10_Two.canvasPlanet.width, prototype10_Two.canvasPlanet.height);
        for (let planet of prototype10_Two.allPlanets) {
            planet.move(2);
            planet.draw(prototype10_Two.ctxPlanet);
        }
        prototype10_Two.ctxUfo.clearRect(0, 0, prototype10_Two.canvasUfo.width, prototype10_Two.canvasUfo.height);
        for (let ufo of prototype10_Two.allUFOs) {
            ufo.move(2);
            ufo.draw(prototype10_Two.ctxUfo);
            ufo.checkCollision();
        }
        prototype10_Two.rocket.checkCollision();
        prototype10_Two.ctxPoint.clearRect(0, 0, prototype10_Two.canvasPoint.width, prototype10_Two.canvasPoint.height);
        for (let ball of prototype10_Two.ufoLaserpoints) {
            ball.move();
            ball.draw();
        }
        for (let balls of prototype10_Two.rocketLaserpoints) {
            balls.move();
            balls.draw();
        }
    }
})(prototype10_Two || (prototype10_Two = {}));
//# sourceMappingURL=main_two.js.map