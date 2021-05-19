"use strict";
var prototype04;
(function (prototype04) {
    //Installing Listener
    window.addEventListener("load", handleLoad);
    //#gameCode
    let codeBtn;
    //#galaxy
    let galaxyContainer;
    //#choice
    let choice;
    //#getCode
    let getCode;
    //.code-container
    let containerCode;
    //gameContainer
    let gameContainer;
    let rocketInfo;
    let ufoInfo;
    let galaxy;
    let theGalaxy;
    let player;
    let code = "Your game code is: ";
    let intervalPlanet;
    let intervalCreate;
    function handleLoad() {
        //Handle Load
        prototype04.canvasRocket = document.querySelector(".rocket-canvas");
        prototype04.canvasBackground = document.querySelector(".background-canvas");
        prototype04.canvasBarrel = document.querySelector(".barrel-canvas");
        prototype04.ctxRocket = prototype04.canvasRocket.getContext("2d");
        prototype04.ctxBackground = prototype04.canvasBackground.getContext("2d");
        prototype04.ctxBarrel = prototype04.canvasBackground.getContext("2d");
        let html = document.querySelector("html");
        prototype04.width = html.clientWidth;
        prototype04.height = html.clientHeight;
        prototype04.canvasBackground.setAttribute("width", prototype04.width + "px");
        prototype04.canvasBackground.setAttribute("height", prototype04.height + "px");
        prototype04.canvasBarrel.setAttribute("width", prototype04.width + "px");
        prototype04.canvasBarrel.setAttribute("height", prototype04.height + "px");
        prototype04.canvasRocket.setAttribute("width", prototype04.width + "px");
        prototype04.canvasRocket.setAttribute("height", prototype04.height + "px");
        getUserPermission();
        installListeners();
    }
    function getUserPermission() {
        // Get Permission of User
        // create device motion/orientation manager
        const motionManager = new DeviceMotionAndOrientationManager();
        // create start screen and register device motion/orientation manager
        const startScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start();
    }
    function handleMove(_event) {
        //Handle Device Move
        if (player == "playerOne") {
            if (_event.gamma) {
                //newPos = startPos + (_event.gamma * 2);
                rocketInfo.move(_event.gamma);
                prototype04.ctxRocket.clearRect(0, 0, prototype04.canvasRocket.width, prototype04.canvasRocket.height);
                rocketInfo.draw();
            }
        }
    }
    function handleTouch() {
    }
    function installListeners() {
        codeBtn = document.querySelector("#gameCode");
        codeBtn.addEventListener("pointerup", createRandomCode);
        galaxyContainer = document.querySelector("#galaxy");
        galaxyContainer.addEventListener("pointerup", createGalaxy);
        choice = document.querySelector("#choice");
        choice.addEventListener("pointerup", choosePlayerRoles);
        getCode = document.querySelector("#getCode");
        getCode.style.display = "block";
    }
    function createRandomCode() {
        if (codeBtn.disabled == false) {
            for (let i = 0; i < 6; i++) {
                let random = Math.floor(Math.random() * 8) + 1;
                code += random.toString();
            }
            containerCode = document.querySelector(".code-container");
            containerCode.innerHTML += code + "";
            choice.style.display = "block";
            codeBtn.disabled = true;
        }
    }
    function createGalaxy(_event) {
        let target = _event.target;
        if (target.classList.contains("red-galaxy")) {
            galaxy = "red";
            galaxyContainer.style.display = "none";
            theGalaxy = new prototype04.Galaxy(galaxy);
        }
        else if (target.classList.contains("blue-galaxy")) {
            galaxy = "blue";
            galaxyContainer.style.display = "none";
            theGalaxy = new prototype04.Galaxy(galaxy);
        }
        else if (target.classList.contains("green-galaxy")) {
            galaxy = "green";
            galaxyContainer.style.display = "none";
            theGalaxy = new prototype04.Galaxy(galaxy);
        }
        getCode.style.display = "none";
        gameContainer = document.querySelector("#game");
        gameContainer.style.display = "block";
        startGame();
    }
    function update() {
        prototype04.ctxBackground.clearRect(0, 0, prototype04.canvasBackground.width, prototype04.canvasBackground.height);
        prototype04.ctxBarrel.clearRect(0, 0, prototype04.canvasBarrel.width, prototype04.canvasBarrel.height);
        for (let planets of theGalaxy.planets) {
            planets.move(2);
            if (planets.position.y > prototype04.canvasBackground.height + 100) {
                let pos = theGalaxy.planets.indexOf(planets);
                theGalaxy.planets.splice(pos, 1);
            }
            planets.draw();
        }
    }
    function newPlanet() {
        let lanes = ["right", "right", "left", "left", "middle"];
        let numbr = Math.floor(Math.random() * lanes.length);
        let lane = lanes[numbr];
        let xPos;
        switch (lane) {
            case "right":
                let minRight = prototype04.width - prototype04.width / 3;
                let maxRight = prototype04.width - 20;
                xPos = getRandom(minRight, maxRight);
                break;
            case "left":
                let minLeft = -20;
                let maxLeft = prototype04.width / 3;
                xPos = getRandom(minLeft, maxLeft);
                break;
            case "middle":
                let minMiddle = prototype04.width / 3;
                let maxMiddle = prototype04.width - prototype04.width / 3;
                xPos = getRandom(minMiddle, maxMiddle);
                break;
            default:
                xPos = Math.floor(Math.random() * prototype04.width);
                break;
        }
        let randomNmbr = Math.floor(Math.random() * theGalaxy.imagesPlanet.length);
        let img = theGalaxy.imagesPlanet[randomNmbr];
        let randomSize = getRandom(50, 120);
        let size = new prototype04.Vector(randomSize, randomSize);
        let planet = new prototype04.Planet(xPos, -50, img, size);
        theGalaxy.planets.push(planet);
    }
    function choosePlayerRoles(_event) {
        let target = _event.target;
        if (target.classList.contains("playerOne")) {
            player = "playerOne";
            choice.style.display = "none";
            galaxyContainer = document.querySelector("#galaxy");
            galaxyContainer.style.display = "block";
        }
        else if (target.classList.contains("playerTwo")) {
            player = "playerTwo";
            choice.style.display = "none";
            galaxyContainer = document.querySelector("#galaxy");
            galaxyContainer.style.display = "block";
        }
    }
    function startGame() {
        window.addEventListener("deviceorientation", handleMove);
        window.addEventListener("pointerup", handleTouch);
        intervalPlanet = window.setInterval(update, 40);
        intervalCreate = window.setInterval(newPlanet, 2500);
        launchRocket();
        createCanon();
    }
    function updateCounter() {
    }
    function launchRocket() {
        let rocketImg = document.querySelector("#rocketNormal");
        let rocketDamageOne = document.querySelector("#rocketDamageOne");
        let rocketDamageTwo = document.querySelector("#rocketDamageTwo");
        let startX = (prototype04.width / 2) - 25;
        let startY = prototype04.height / 2 + 60;
        rocketInfo = new prototype04.Rocket(startX, startY, rocketImg, rocketDamageOne, rocketDamageTwo);
    }
    function createCanon() {
    }
    function getRandom(_min, _max) {
        let delta = _max - _min;
        let random = Math.random();
        let multiplied = random * delta;
        let floored = Math.floor(multiplied);
        let answer = floored + _min;
        return answer;
    }
})(prototype04 || (prototype04 = {}));
//# sourceMappingURL=main.js.map