namespace prototype10_Two {
    interface Update {
        selector: string;
        data: string;
    }

    let socket: WebSocket = new WebSocket("wss://agkeia.herokuapp.com/");

    export let canvasPoint: HTMLCanvasElement;
    export let ctxPoint: CanvasRenderingContext2D;

    export let canvasPlanet: HTMLCanvasElement;
    export let ctxPlanet: CanvasRenderingContext2D;

    export let canvasRocket: HTMLCanvasElement;
    export let ctxRocket: CanvasRenderingContext2D;

    export let canvasUfo: HTMLCanvasElement;
    export let ctxUfo: CanvasRenderingContext2D;

    export let width: number;
    export let height: number;
    export let startY: number;
    export let startX: number;

    export let allImg: HTMLImageElement[] = [];
    export let ufoImg: HTMLImageElement;
    export let rocketImg: HTMLImageElement;
    export let rocketImgO: HTMLImageElement;
    export let rocketImgT: HTMLImageElement;
    export let barrelImg: HTMLImageElement;


    export let allPlanets: Planet[] = [];
    export let allUFOs: UFO[] = [];
    export let ufoLaserpoints: Ball[] = [];
    export let rocketLaserpoints: Ball[] = [];

    let pinkPlanet: HTMLImageElement;
    let orangePlanet: HTMLImageElement;

    export let rocket: Rocket;

    export let ufoBallIndex: number = 0;
    let planetIndex: number = 0;
    let ufoIndex: number = 0;
    let rocketBallIndex: number = 0;
    let lanes: string[] = ["right", "right", "left", "left", "middle"];

    window.addEventListener("load", handleLoad);
    window.addEventListener("pointerup", handleTouch);
    socket.addEventListener("message", getData); 

    function handleLoad(): void {
        /* const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start(); */

        rocketImg = <HTMLImageElement>document.querySelector("#normal");
        rocketImgO = <HTMLImageElement>document.querySelector("#damageOne");
        rocketImgT = <HTMLImageElement>document.querySelector("#damageTwo");

        barrelImg = <HTMLImageElement>document.querySelector(".barrel");

        ufoImg = <HTMLImageElement>document.querySelector(".ufo");

        let planetImgs: NodeListOf<HTMLImageElement> = document.querySelectorAll(".planet");
        for (let i: number = 0; i < planetImgs.length; i++) {
            allImg.push(planetImgs[i]);
        }

        canvasPoint = <HTMLCanvasElement>document.querySelector("#pointCanvas");
        ctxPoint = <CanvasRenderingContext2D>canvasPoint.getContext("2d");

        canvasPlanet = <HTMLCanvasElement>document.querySelector("#canvasPlanet");
        ctxPlanet = <CanvasRenderingContext2D>canvasPlanet.getContext("2d");

        canvasRocket = <HTMLCanvasElement>document.querySelector("#rocketCanvas");
        ctxRocket = <CanvasRenderingContext2D>canvasRocket.getContext("2d");

        canvasUfo = <HTMLCanvasElement>document.querySelector("#canvasUfo");
        ctxUfo = <CanvasRenderingContext2D>canvasUfo.getContext("2d");

        pinkPlanet = <HTMLImageElement>document.querySelector(".pink");
        orangePlanet = <HTMLImageElement>document.querySelector(".orange");

        let html: HTMLElement = <HTMLElement>document.querySelector("html");
        width = html.clientWidth;
        height = html.clientHeight;

        canvasPlanet.setAttribute("width", width + "px");
        canvasPlanet.setAttribute("height", height + "px");

        canvasPoint.setAttribute("width", width + "px");
        canvasPoint.setAttribute("height", height + "px");

        canvasRocket.setAttribute("width", width + "px");
        canvasRocket.setAttribute("height", height + "px");

        canvasUfo.setAttribute("width", width + "px");
        canvasUfo.setAttribute("height", height + "px");

        startX = (width / 2) - 25;
        startY = (height / 2) + 60;

        rocket = new Rocket(startX, startY, rocketImg, rocketImgO, rocketImgT);
        rocket.drawRocket();
        update();
    }



    function update(): void {
        window.setInterval(movePlanets, 40);

        let random: number = getRandom(2000, 5000);
        window.setInterval(
            function (): void {
                let pos: number = getLane();
                createMoveable("ufo", pos);
                random = getRandom(2000, 5000);

            },
            random);

        let randomLaserpoint: number = getRandom(10000, 12000);
        let ufoShoots: number = Math.floor(Math.random() * allUFOs.length);

        window.setInterval(
            function (): void {
                console.log(allUFOs.length, ufoShoots);
                allUFOs[ufoShoots].shoot();
                randomLaserpoint = getRandom(10000, 12000);
            },
            randomLaserpoint);
    }

    function createMoveable(_type: string, _xPos: number): void {
        let randomNmbr: number = Math.floor(Math.random() * allImg.length);
        let randomSize: number = getRandom(50, 120);

        if (_type == "planet") {
            let img: HTMLImageElement = allImg[randomNmbr];
            let type: string = "orange";
            if (img.classList.contains("pink")) {
                type = "pink";
            }
            let planet: Planet = new Planet(_xPos, -50, img, randomSize, planetIndex, type);
            planetIndex++;
            allPlanets.push(planet);
        }
        else if (_type == "ufo") {
            let img: HTMLImageElement = ufoImg;
            let ufo: UFO = new UFO(_xPos, -50, randomSize, randomSize, img, ufoIndex);
            ufoIndex++;
            allUFOs.push(ufo);
        }
    }


    function handleTouch(_event: PointerEvent): void {
        let endX: number = rocket.newPos + 20;
        let endY: number = rocket.startPosY;

        let ball: Ball = new Ball(endX, endY, rocketBallIndex, "lightgreen");
        rocketBallIndex++;
        ball.getElevation(_event.clientX, _event.clientY);
        ball.draw();
        rocketLaserpoints.push(ball);
    }

    function getLane(): number {
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
        return xPos;
    }

    function getRandom(_min: number, _max: number): number {
        let delta: number = _max - _min;
        let multiplied: number = Math.random() * delta;
        let floored: number = Math.floor(multiplied);

        let answer: number = floored + _min;
        return answer;
    }

    function movePlanets(): void {
        ctxPlanet.clearRect(0, 0, canvasPlanet.width, canvasPlanet.height);
        for (let planet of allPlanets) {
            planet.move(2);
            planet.draw(ctxPlanet);
        }

        ctxUfo.clearRect(0, 0, canvasUfo.width, canvasUfo.height);
        for (let ufo of allUFOs) {
            ufo.move(2);
            ufo.draw(ctxUfo);
            ufo.checkCollision();
        }

        rocket.checkCollision();

        ctxPoint.clearRect(0, 0, canvasPoint.width, canvasPoint.height);
        for (let ball of ufoLaserpoints) {
            ball.move();
            ball.draw();
        }

        for (let balls of rocketLaserpoints) {
            balls.move();
            balls.draw();
        }
    }

    function sendUFONew(_xPosition: number, _yPosition: number, _sizeX: number, _sizeY: number, _index: number): void {
        let update: Update = {
            selector: "ufo",
            data: _xPosition + "&a&" + _yPosition + "&a&" + _sizeX + "&a&" + _sizeY + "&a&" + _index
        };

        socket.send(JSON.stringify(update));
    }

    function sendUFOshoot(_index: number): void {
        let update: Update = {
            selector: "shoot",
            data: _index + ""
        };

        socket.send(JSON.stringify(update));
    }

    function sendBall(_index: number, _color: string, _elevationX: number, _elevationY: number): void {
        let update: Update = {
            selector: "ball",
            data: _index + "&a&" + _elevationX + "&a&" + _elevationY
        };

        socket.send(JSON.stringify(update));
    }

    function getData(_event: any): void {
        let carrier: Update = <Update>JSON.parse(_event.data);
        let selector: string = carrier.selector;
        let data: string = carrier.data;

        switch (selector) {
            case "rocket":
                let nmbr: number = Number(data);
                rocket.move(nmbr);
                break;
            case "planet":
                let pretty: string[] = data.split("&a&");
                let posX: number = Number(pretty[0]);
                let posY: number = Number(pretty[1]);
                let size: number = Number(pretty[2]);
                let index: number = Number(pretty[3]);

                if (pretty[4] == "pink") {
                    let planet: Planet = new Planet(posX, posY, pinkPlanet, size, index, "pink"); 
                    allPlanets.push(planet); 
                }
                else {
                    let planet: Planet = new Planet(posX, posY, orangePlanet, size, index, "orange"); 
                    allPlanets.push(planet); 
                }
                planetIndex++; 
                break; 
        }
    }
}