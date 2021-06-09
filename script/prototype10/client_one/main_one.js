"use strict";
var prototype10_One;
(function (prototype10_One) {
    let socket = new WebSocket("wss://agkeia.herokuapp.com/");
    let readyOne = false;
    prototype10_One.allImg = [];
    prototype10_One.allPlanets = [];
    prototype10_One.allUFOs = [];
    prototype10_One.ufoLaserpoints = [];
    prototype10_One.rocketLaserpoints = [];
    prototype10_One.ufoBallIndex = 0;
    let planetIndex = 0;
    let ufoIndex = 0;
    let lanes = ["right", "right", "left", "left", "middle"];
    window.addEventListener("load", handleLoad);
    socket.addEventListener("message", getData);
    async function handleLoad() {
        const motionManager = new DeviceMotionAndOrientationManager();
        const startScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        await startScreen.start();
        readyOne = true;
        sendStart();
        prototype10_One.rocketImg = document.querySelector("#normal");
        prototype10_One.rocketImgO = document.querySelector("#damageOne");
        prototype10_One.rocketImgT = document.querySelector("#damageTwo");
        prototype10_One.barrelImg = document.querySelector(".barrel");
        prototype10_One.ufoImg = document.querySelector(".ufo");
        let planetImgs = document.querySelectorAll(".planet");
        for (let i = 0; i < planetImgs.length; i++) {
            prototype10_One.allImg.push(planetImgs[i]);
        }
        prototype10_One.canvasPoint = document.querySelector("#pointCanvas");
        prototype10_One.ctxPoint = prototype10_One.canvasPoint.getContext("2d");
        prototype10_One.canvasPlanet = document.querySelector("#canvasPlanet");
        prototype10_One.ctxPlanet = prototype10_One.canvasPlanet.getContext("2d");
        prototype10_One.canvasRocket = document.querySelector("#rocketCanvas");
        prototype10_One.ctxRocket = prototype10_One.canvasRocket.getContext("2d");
        prototype10_One.canvasUfo = document.querySelector("#canvasUfo");
        prototype10_One.ctxUfo = prototype10_One.canvasUfo.getContext("2d");
        prototype10_One.width = 360;
        prototype10_One.height = 560;
    }
    function startGame() {
        window.addEventListener("deviceorientation", handleMove);
        console.log("game started");
        setSize();
        prototype10_One.startX = (prototype10_One.width / 2) - 25;
        prototype10_One.startY = (prototype10_One.height / 2) + 60;
        prototype10_One.rocket = new prototype10_One.Rocket(prototype10_One.startX, prototype10_One.startY, prototype10_One.rocketImg, prototype10_One.rocketImgO, prototype10_One.rocketImgT);
        prototype10_One.rocket.drawRocket();
        update();
    }
    function setSize() {
        prototype10_One.canvasPlanet.setAttribute("width", prototype10_One.width + "px");
        prototype10_One.canvasPlanet.setAttribute("height", prototype10_One.height + "px");
        prototype10_One.canvasPoint.setAttribute("width", prototype10_One.width + "px");
        prototype10_One.canvasPoint.setAttribute("height", prototype10_One.height + "px");
        prototype10_One.canvasRocket.setAttribute("width", prototype10_One.width + "px");
        prototype10_One.canvasRocket.setAttribute("height", prototype10_One.height + "px");
        prototype10_One.canvasUfo.setAttribute("width", prototype10_One.width + "px");
        prototype10_One.canvasUfo.setAttribute("height", prototype10_One.height + "px");
    }
    function handleMove(_event) {
        if (_event.gamma) {
            prototype10_One.rocket.move(_event.gamma);
            prototype10_One.rocket.drawRocket();
            sendRocketPosition(_event.gamma);
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
            let type = "orange";
            if (img.classList.contains("pink")) {
                type = "pink";
            }
            let planet = new prototype10_One.Planet(_xPos, -50, img, randomSize, planetIndex, type);
            planetIndex++;
            prototype10_One.allPlanets.push(planet);
            sendPlanetData(_xPos, -50, randomSize, planetIndex, type);
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
        prototype10_One.ctxUfo.clearRect(0, 0, prototype10_One.canvasUfo.width, prototype10_One.canvasUfo.height);
        for (let ufo of prototype10_One.allUFOs) {
            ufo.move(2);
            ufo.draw(prototype10_One.ctxUfo);
            ufo.checkCollision();
        }
        prototype10_One.rocket.checkCollision();
        prototype10_One.ctxPoint.clearRect(0, 0, prototype10_One.canvasPoint.width, prototype10_One.canvasPoint.height);
        for (let ball of prototype10_One.ufoLaserpoints) {
            ball.move();
            ball.draw();
        }
        for (let balls of prototype10_One.rocketLaserpoints) {
            balls.move();
            balls.draw();
        }
    }
    function sendRocketPosition(_newPos) {
        let update = {
            selector: "rocket",
            data: _newPos + ""
        };
        socket.send(JSON.stringify(update));
    }
    function sendPlanetData(_xPos, _yPos, _size, _index, _type) {
        let update = {
            selector: "planet",
            data: _xPos + "&a&" + _yPos + "&a&" + _size + "&a&" + _index + "&a&" + _type
        };
        socket.send(JSON.stringify(update));
    }
    function sendDamageUpdate() {
        let update = {
            selector: "damage",
            data: prototype10_One.rocket.damageStatus + ""
        };
        socket.send(JSON.stringify(update));
    }
    prototype10_One.sendDamageUpdate = sendDamageUpdate;
    function sendStart() {
        let update = {
            selector: "ready",
            data: "user1"
        };
        socket.send(JSON.stringify(update));
    }
    function getData(_event) {
        let carrier = JSON.parse(_event.data);
        let selector = carrier.selector;
        let data = carrier.data;
        console.log(selector);
        switch (selector) {
            case "ufo":
                let pretty = data.split("&a&");
                let posX = Number(pretty[0]);
                let posY = Number(pretty[1]);
                let sizeX = Number(pretty[2]);
                let sizeY = Number(pretty[3]);
                let index = Number(pretty[4]);
                let newUfo = new prototype10_One.UFO(posX, posY, sizeX, sizeY, prototype10_One.ufoImg, index);
                ufoIndex = index + 1;
                prototype10_One.allUFOs.push(newUfo);
                break;
            case "shoot":
                let ufoIndexNmbr = Number(data);
                prototype10_One.allUFOs[ufoIndexNmbr].shoot();
                prototype10_One.ufoBallIndex++;
                break;
            case "ball":
                let arr = data.split("&a&");
                let ind = Number(arr[0]);
                let elevationX = Number(arr[1]);
                let elevationY = Number(arr[2]);
                let ball = new prototype10_One.Ball(prototype10_One.rocket.newPos, prototype10_One.rocket.startPosY, ind, "lightgreen");
                ball.getElevation(elevationX, elevationY);
                ball.draw();
                prototype10_One.rocketLaserpoints.push(ball);
                break;
            case "damage":
                let damageValue = Number(data);
                prototype10_One.rocket.damageStatus = damageValue;
                prototype10_One.rocket.drawRocket();
                break;
            case "start":
                startGame();
                break;
        }
    }
})(prototype10_One || (prototype10_One = {}));
//# sourceMappingURL=main_one.js.map