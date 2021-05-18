"use strict";
var prototype04;
(function (prototype04) {
    //Installing Listener
    window.addEventListener("load", handleLoad);
    //Defining global Variables
    let canvasRocket;
    let canvasBackground;
    let canvasBarrel;
    let rocketInfo;
    let ufoInfo;
    let galaxy;
    let theGalaxy;
    let player;
    let code = "Your game code is: ";
    let nextContainer;
    let intervalPlanet;
    let intervalCreate;
    function handleLoad() {
        //Handle Load
        canvasRocket = document.querySelector(".rocket-canvas");
        canvasBackground = document.querySelector(".background-canvas");
        canvasBarrel = document.querySelector(".barrel-canvas");
        prototype04.ctxRocket = canvasRocket.getContext("2d");
        prototype04.ctxBackground = canvasBackground.getContext("2d");
        prototype04.ctxBarrel = canvasBackground.getContext("2d");
        let html = document.querySelector("html");
        prototype04.width = html.clientWidth;
        prototype04.height = html.clientHeight;
        canvasBackground.setAttribute("width", prototype04.width + "px");
        canvasBackground.setAttribute("height", prototype04.height + "px");
        canvasBarrel.setAttribute("width", prototype04.width + "px");
        canvasBarrel.setAttribute("height", prototype04.height + "px");
        canvasRocket.setAttribute("width", prototype04.width + "px");
        canvasRocket.setAttribute("height", prototype04.height + "px");
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
    function handleMove() {
        //Handle Device Move
    }
    function handleTouch() {
    }
    function installListeners() {
        let codeBtn = document.querySelector("#gameCode");
        codeBtn.addEventListener("pointerup", createRandomCode);
        let galaxyContainer = document.querySelector("#galaxy");
        galaxyContainer.addEventListener("pointerup", createGalaxy);
        let choice = document.querySelector("#choice");
        choice.addEventListener("pointerup", choosePlayerRoles);
        let getCode = document.querySelector("#getCode");
        getCode.style.display = "block";
    }
    function createRandomCode() {
        let btn = document.querySelector("#gameCode");
        if (btn.disabled == false) {
            for (let i = 0; i < 6; i++) {
                let random = Math.floor(Math.random() * 8) + 1;
                code += random.toString();
            }
            let container = document.querySelector(".code-container");
            container.innerHTML += code + "";
            nextContainer = document.querySelector("#galaxy");
            nextContainer.style.display = "block";
            btn.disabled = true;
        }
    }
    function createGalaxy(_event) {
        console.log("createGalaxy");
        let target = _event.target;
        if (target.classList.contains("red-galaxy")) {
            galaxy = "red";
            nextContainer.style.display = "none";
            theGalaxy = new prototype04.Galaxy(galaxy);
        }
        else if (target.classList.contains("blue-galaxy")) {
            galaxy = "blue";
            nextContainer.style.display = "none";
            theGalaxy = new prototype04.Galaxy(galaxy);
        }
        else if (target.classList.contains("green-galaxy")) {
            galaxy = "green";
            nextContainer.style.display = "none";
            theGalaxy = new prototype04.Galaxy(galaxy);
        }
        let gameCode = document.querySelector("#getCode");
        gameCode.style.display = "none";
        let gameContainer = document.querySelector("#game");
        gameContainer.style.display = "block";
        intervalPlanet = window.setInterval(update, 40);
        intervalCreate = window.setInterval(newPlanet, 2500);
    }
    function update() {
        prototype04.ctxBackground.clearRect(0, 0, canvasBackground.width, canvasBackground.height);
        prototype04.ctxBarrel.clearRect(0, 0, canvasBarrel.width, canvasBarrel.height);
        prototype04.ctxRocket.clearRect(0, 0, canvasRocket.width, canvasRocket.height);
        for (let planets of theGalaxy.planets) {
            planets.move(2);
            if (planets.position.y > canvasBackground.height + 100) {
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
        console.log(theGalaxy.planets);
    }
    function choosePlayerRoles() {
    }
    function startGame() {
        window.addEventListener("deviceorientation", handleMove);
        window.addEventListener("pointerup", handleTouch);
    }
    function updateCounter() {
    }
    function launchRocket() {
    }
    function createCanon() {
    }
    function getRandom(_min, _max) {
        console.log("get random");
        let delta = _max - _min;
        let random = Math.random();
        let multiplied = random * delta;
        let floored = Math.floor(multiplied);
        let answer = floored + _min;
        return answer;
    }
})(prototype04 || (prototype04 = {}));
//# sourceMappingURL=main.js.map