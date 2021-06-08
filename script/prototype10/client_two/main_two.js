"use strict";
var prototype10_Two;
(function (prototype10_Two) {
    let socket = new WebSocket("wss://agkeia.herokuapp.com/");
    prototype10_Two.allImg = [];
    prototype10_Two.allPlanets = [];
    prototype10_Two.allUFOs = [];
    prototype10_Two.ufoLaserpoints = [];
    prototype10_Two.rocketLaserpoints = [];
    let pinkPlanet;
    let orangePlanet;
    prototype10_Two.ufoBallIndex = 0;
    let planetIndex = 0;
    let ufoIndex = 0;
    let rocketBallIndex = 0;
    let lanes = ["right", "right", "left", "left", "middle"];
    window.addEventListener("load", handleLoad);
    window.addEventListener("pointerup", handleTouch);
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
        prototype10_Two.canvasPoint = document.querySelector("#pointCanvas");
        prototype10_Two.ctxPoint = prototype10_Two.canvasPoint.getContext("2d");
        prototype10_Two.canvasPlanet = document.querySelector("#canvasPlanet");
        prototype10_Two.ctxPlanet = prototype10_Two.canvasPlanet.getContext("2d");
        prototype10_Two.canvasRocket = document.querySelector("#rocketCanvas");
        prototype10_Two.ctxRocket = prototype10_Two.canvasRocket.getContext("2d");
        prototype10_Two.canvasUfo = document.querySelector("#canvasUfo");
        prototype10_Two.ctxUfo = prototype10_Two.canvasUfo.getContext("2d");
        pinkPlanet = document.querySelector(".pink");
        orangePlanet = document.querySelector(".orange");
        let html = document.querySelector("html");
        prototype10_Two.width = html.clientWidth;
        prototype10_Two.height = html.clientHeight;
        prototype10_Two.canvasPlanet.setAttribute("width", prototype10_Two.width + "px");
        prototype10_Two.canvasPlanet.setAttribute("height", prototype10_Two.height + "px");
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
        update();
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
            let type = "orange";
            if (img.classList.contains("pink")) {
                type = "pink";
            }
            let planet = new prototype10_Two.Planet(_xPos, -50, img, randomSize, planetIndex, type);
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
        let endX = prototype10_Two.rocket.newPos + 20;
        let endY = prototype10_Two.rocket.startPosY;
        let ball = new prototype10_Two.Ball(endX, endY, rocketBallIndex, "lightgreen");
        rocketBallIndex++;
        ball.getElevation(_event.clientX, _event.clientY);
        ball.draw();
        prototype10_Two.rocketLaserpoints.push(ball);
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
    function sendUFONew(_xPosition, _yPosition, _sizeX, _sizeY, _index) {
        let update = {
            selector: "ufo",
            data: _xPosition + "&a&" + _yPosition + "&a&" + _sizeX + "&a&" + _sizeY + "&a&" + _index
        };
        socket.send(JSON.stringify(update));
    }
    function sendUFOshoot(_index) {
        let update = {
            selector: "shoot",
            data: _index + ""
        };
        socket.send(JSON.stringify(update));
    }
    function sendBall(_index, _color, _elevationX, _elevationY) {
        let update = {
            selector: "ball",
            data: _index + "&a&" + _color + "&a&" + _elevationX + "&a&" + _elevationY
        };
        socket.send(JSON.stringify(update));
    }
    function getData(_event) {
        let carrier = JSON.parse(_event.data);
        let selector = carrier.selector;
        let data = carrier.data;
        switch (selector) {
            case "rocket":
                let nmbr = Number(data);
                prototype10_Two.rocket.move(nmbr);
                break;
            case "planet":
                let pretty = data.split("&a&");
                let posX = Number(pretty[0]);
                let posY = Number(pretty[1]);
                let size = Number(pretty[2]);
                let index = Number(pretty[3]);
                if (pretty[4] == "pink") {
                    let planet = new prototype10_Two.Planet(posX, posY, pinkPlanet, size, index, "pink");
                    prototype10_Two.allPlanets.push(planet);
                }
                else {
                    let planet = new prototype10_Two.Planet(posX, posY, orangePlanet, size, index, "orange");
                    prototype10_Two.allPlanets.push(planet);
                }
                break;
        }
    }
})(prototype10_Two || (prototype10_Two = {}));
//# sourceMappingURL=main_two.js.map