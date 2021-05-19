namespace prototype04 {
    //Installing Listener
    window.addEventListener("load", handleLoad);

    //Defining global Variables
    let canvasRocket: HTMLCanvasElement;
    let canvasBackground: HTMLCanvasElement;
    let canvasBarrel: HTMLCanvasElement;

    export let ctxRocket: CanvasRenderingContext2D;
    export let ctxBackground: CanvasRenderingContext2D;
    export let ctxBarrel: CanvasRenderingContext2D;

    //#gameCode
    let codeBtn: HTMLButtonElement;
    //#galaxy
    let galaxyContainer: HTMLDivElement;
    //#choice
    let choice: HTMLDivElement;
    //#getCode
    let getCode: HTMLDivElement;
    //.code-container
    let containerCode: HTMLDivElement;
    //gameContainer
    let gameContainer: HTMLDivElement;


    let rocketInfo: Rocket;
    let ufoInfo: UFO[];

    let galaxy: string;
    let theGalaxy: Galaxy;

    let player: string;

    let code: string = "Your game code is: ";

    let intervalPlanet: number;
    let intervalCreate: number;

    export let width: number;
    export let height: number;

    function handleLoad(): void {
        //Handle Load
        canvasRocket = <HTMLCanvasElement>document.querySelector(".rocket-canvas");
        canvasBackground = <HTMLCanvasElement>document.querySelector(".background-canvas");
        canvasBarrel = <HTMLCanvasElement>document.querySelector(".barrel-canvas");

        ctxRocket = <CanvasRenderingContext2D>canvasRocket.getContext("2d");
        ctxBackground = <CanvasRenderingContext2D>canvasBackground.getContext("2d");
        ctxBarrel = <CanvasRenderingContext2D>canvasBackground.getContext("2d");

        let html: HTMLElement = <HTMLElement>document.querySelector("html");
        width = html.clientWidth;
        height = html.clientHeight;

        canvasBackground.setAttribute("width", width + "px");
        canvasBackground.setAttribute("height", height + "px");

        canvasBarrel.setAttribute("width", width + "px");
        canvasBarrel.setAttribute("height", height + "px");

        canvasRocket.setAttribute("width", width + "px");
        canvasRocket.setAttribute("height", height + "px");

        getUserPermission();
        installListeners();
    }

    function getUserPermission(): void {
        // Get Permission of User
        // create device motion/orientation manager
        const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        // create start screen and register device motion/orientation manager
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start();
    }

    function handleMove(_event: DeviceOrientationEvent): void {
        //Handle Device Move
        if (player == "playerOne") {
            if (_event.gamma) {
                //newPos = startPos + (_event.gamma * 2);
                rocketInfo.move(_event.gamma * 2);  
                ctxRocket.clearRect(0, 0, canvasRocket.width, canvasRocket.height); 
                rocketInfo.draw(); 
            }
        }
    }

    function handleTouch(): void {

    }

    function installListeners(): void {
        codeBtn = <HTMLButtonElement>document.querySelector("#gameCode");
        codeBtn.addEventListener("pointerup", createRandomCode);

        galaxyContainer = <HTMLDivElement>document.querySelector("#galaxy");
        galaxyContainer.addEventListener("pointerup", createGalaxy);

        choice = <HTMLDivElement>document.querySelector("#choice");
        choice.addEventListener("pointerup", choosePlayerRoles);

        getCode = <HTMLDivElement>document.querySelector("#getCode");
        getCode.style.display = "block";
    }

    function createRandomCode(): void {

        if (codeBtn.disabled == false) {
            for (let i: number = 0; i < 6; i++) {
                let random: number = Math.floor(Math.random() * 8) + 1;
                code += random.toString();
            }

            containerCode = <HTMLDivElement>document.querySelector(".code-container");
            containerCode.innerHTML += code + "";

            choice.style.display = "block";

            codeBtn.disabled = true;
        }

    }

    function createGalaxy(_event: PointerEvent): void {
        console.log("createGalaxy");

        let target: HTMLElement = <HTMLElement>_event.target;

        if (target.classList.contains("red-galaxy")) {
            galaxy = "red";
            galaxyContainer.style.display = "none";
            theGalaxy = new Galaxy(galaxy);
        }
        else if (target.classList.contains("blue-galaxy")) {
            galaxy = "blue";
            galaxyContainer.style.display = "none";
            theGalaxy = new Galaxy(galaxy);
        }
        else if (target.classList.contains("green-galaxy")) {
            galaxy = "green";
            galaxyContainer.style.display = "none";
            theGalaxy = new Galaxy(galaxy);
        }

        getCode.style.display = "none";

        gameContainer = <HTMLDivElement>document.querySelector("#game");
        gameContainer.style.display = "block";

        startGame();
    }

    function update(): void {
        ctxBackground.clearRect(0, 0, canvasBackground.width, canvasBackground.height);
        ctxBarrel.clearRect(0, 0, canvasBarrel.width, canvasBarrel.height);
        ctxRocket.clearRect(0, 0, canvasRocket.width, canvasRocket.height);
        for (let planets of theGalaxy.planets) {
            planets.move(2);
            if (planets.position.y > canvasBackground.height + 100) {
                let pos: number = theGalaxy.planets.indexOf(planets);
                theGalaxy.planets.splice(pos, 1);
            }
            planets.draw();
        }
    }

    function newPlanet(): void {
        let lanes: string[] = ["right", "right", "left", "left", "middle"];
        let numbr: number = Math.floor(Math.random() * lanes.length);
        let lane: string = lanes[numbr];

        let xPos: number;
        switch (lane) {
            case "right":
                let minRight: number = width - width / 3;
                let maxRight: number = width - 20;
                xPos = getRandom(minRight, maxRight);
                break;
            case "left":
                let minLeft: number = -20;
                let maxLeft: number = width / 3;
                xPos = getRandom(minLeft, maxLeft);
                break;
            case "middle":
                let minMiddle: number = width / 3;
                let maxMiddle: number = width - width / 3;
                xPos = getRandom(minMiddle, maxMiddle);
                break;
            default:
                xPos = Math.floor(Math.random() * width);
                break;
        }
        let randomNmbr: number = Math.floor(Math.random() * theGalaxy.imagesPlanet.length);
        let img: HTMLImageElement = theGalaxy.imagesPlanet[randomNmbr];

        let randomSize: number = getRandom(50, 120);
        let size: Vector = new Vector(randomSize, randomSize);

        let planet: Planet = new Planet(xPos, -50, img, size);
        theGalaxy.planets.push(planet);
    }

    function choosePlayerRoles(_event: PointerEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        if (target.classList.contains("playerOne")) {
            player = "playerOne";

            choice.style.display = "none";

            galaxyContainer = <HTMLDivElement>document.querySelector("#galaxy");
            galaxyContainer.style.display = "block";
        }

        else if (target.classList.contains("playerTwo")) {
            player = "playerTwo";

            choice.style.display = "none";

            galaxyContainer = <HTMLDivElement>document.querySelector("#galaxy");
            galaxyContainer.style.display = "block";
        }
    }

    function startGame(): void {
        window.addEventListener("deviceorientation", handleMove);
        window.addEventListener("pointerup", handleTouch);

        intervalPlanet = window.setInterval(update, 40);
        intervalCreate = window.setInterval(newPlanet, 2500);

        launchRocket();
        createCanon();
    }

    function updateCounter(): void {

    }

    function launchRocket(): void {
        let rocketImg: HTMLImageElement = <HTMLImageElement>document.querySelector("#rocketNormal");
        let rocketDamageOne: HTMLImageElement = <HTMLImageElement>document.querySelector("#rocketDamageOne");
        let rocketDamageTwo: HTMLImageElement = <HTMLImageElement>document.querySelector("#rocketDamageTwo");

        let startX: number = (width / 2) - 25;
        let startY: number = height / 2 + 60;
        rocketInfo = new Rocket(startX, startY, rocketImg, rocketDamageOne, rocketDamageTwo);
    }

    function createCanon(): void {

    }

    function getRandom(_min: number, _max: number): number {
        let delta: number = _max - _min;

        let random: number = Math.random();
        let multiplied: number = random * delta;
        let floored: number = Math.floor(multiplied);

        let answer: number = floored + _min;
        return answer;
    }
}