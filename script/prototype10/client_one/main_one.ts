namespace prototype10_One {
    //The interface we need for the server-messages. It consists of a selector so we know what to do with the data and of course the data itself
    interface Update {
        selector: string;
        data: string;
    }

    //Creating a websocket connection
    let socket: WebSocket = new WebSocket("wss://agkeia.herokuapp.com/");

    //This counter checks, if both players are ready
    let readyCount: number = 0;

    //Certain functions are only executed if gameover is false
    export let gameover: boolean = false;

    //Declaring variables for all four canvas and their rendering contexts
    export let canvasPoint: HTMLCanvasElement;
    export let ctxPoint: CanvasRenderingContext2D;

    export let canvasPlanet: HTMLCanvasElement;
    export let ctxPlanet: CanvasRenderingContext2D;

    export let canvasRocket: HTMLCanvasElement;
    export let ctxRocket: CanvasRenderingContext2D;

    export let canvasUfo: HTMLCanvasElement;
    export let ctxUfo: CanvasRenderingContext2D;

    //The width and height of all canvas and the start-position of the rocket
    export let width: number;
    export let height: number;
    export let startY: number;
    export let startX: number;

    // The images we need to draw the stuff we need on the canvas
    export let allImg: HTMLImageElement[] = [];
    export let ufoImg: HTMLImageElement;
    export let rocketImg: HTMLImageElement;
    export let rocketImgO: HTMLImageElement;
    export let rocketImgT: HTMLImageElement;

    // The arrays we need to manage all elements on the screen 
    export let allPlanets: Planet[] = [];
    export let allUFOs: UFO[] = [];
    export let ufoLaserpoints: Ball[] = [];
    export let rocketLaserpoints: Ball[] = [];

    export let rocket: Rocket;

    export let ufoBallIndex: number = 0;
    let planetIndex: number = 0;
    let ufoIndex: number = 0;
    //In order to control the position of the new ufos and planets, we create lanes and use them later in a function
    let lanes: string[] = ["right", "right", "left", "left", "middle"];

    //Adding the first event-listeners. The deviceorientation listener is added later, so we don't detect movement too early
    window.addEventListener("load", handleLoad);
    socket.addEventListener("message", getData);

    async function handleLoad(): Promise<void> {
        //Showing the start screen to get the permission of the user to use the deviceorientation 
        const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        //Waiting for the user to touch the screen 
        await startScreen.start();
        //updating the counter
        readyCount++;
        sendStart();

        //Now that the html is loaded, we can select all the images and canvas
        rocketImg = <HTMLImageElement>document.querySelector("#normal");
        rocketImgO = <HTMLImageElement>document.querySelector("#damageOne");
        rocketImgT = <HTMLImageElement>document.querySelector("#damageTwo");

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

        //Setting the height and width to fixed values (the game is played on a smartphone but we need the same width and height for both clients)
        width = 360;
        height = 560;

        //Checking if the ready count has the value we want to start the game
        if (readyCount == 3) {
            startGame();
        }
    }

    function startGame(): void {
        //Now that the game has started, we can install the listener for the movement of the phone
        window.addEventListener("deviceorientation", handleMove);
        //we set the size of all canvas to the height and width we defined earlier
        setSize();

        //The start-position of the rocket is calculated
        startX = (width / 2) - 25;
        startY = (height / 2) + 60;

        //Now we can create our rocket and draw it
        rocket = new Rocket(startX, startY, rocketImg, rocketImgO, rocketImgT);
        rocket.drawRocket();

        //After everything is done, we can begin to animate the scene
        update();
    }

    function setSize(): void {
        //Setting the width and height of all canvas 
        canvasPlanet.setAttribute("width", width + "px");
        canvasPlanet.setAttribute("height", height + "px");

        canvasPoint.setAttribute("width", width + "px");
        canvasPoint.setAttribute("height", height + "px");

        canvasRocket.setAttribute("width", width + "px");
        canvasRocket.setAttribute("height", height + "px");

        canvasUfo.setAttribute("width", width + "px");
        canvasUfo.setAttribute("height", height + "px");
    }

    function handleMove(_event: DeviceOrientationEvent): void {
        //Checking, if the value we need is there
        if (_event.gamma) {
            //If the value we need (event.gamma, the rotation around the y-Axis (moving the phone to the left and right))
            //The new value is sent to the move method and the rocket is re-drawn 
            rocket.move(_event.gamma);
            rocket.drawRocket();
            //Then the new position is sent to the server so we can update the rocket of the other player
            sendRocketPosition(_event.gamma);
        }
    }

    function update(): void {
        //every 40ms, we redraw the planets and ufos
        window.setInterval(movePlanets, 40);

        //every 2-5 seconds, a new planet is created
        let random: number = getRandom(2000, 5000);
        window.setInterval(
            function (): void {
                let pos: number = getLane();
                createMoveable("planet", pos);
                random = getRandom(2000, 5000);

            },
            random);
    }

    function createMoveable(_type: string, _xPos: number): void {
        //getting a random planet image and a random size between 50 and 120
        let randomNmbr: number = Math.floor(Math.random() * allImg.length);
        let randomSize: number = getRandom(50, 120);

        if (_type == "planet") {
            //creating a new planet, pushing it into the array and sending the info to the server
            let img: HTMLImageElement = allImg[randomNmbr];
            let type: string = "orange";
            if (img.classList.contains("pink")) {
                type = "pink";
            }
            let planet: Planet = new Planet(_xPos, -50, img, randomSize, planetIndex, type);
            planetIndex++;
            allPlanets.push(planet);

            sendPlanetData(_xPos, -50, randomSize, planetIndex, type);
        }
        else if (_type == "ufo") {
            let img: HTMLImageElement = ufoImg;
            let ufo: UFO = new UFO(_xPos, -50, randomSize, randomSize, img, ufoIndex);
            ufoIndex++;
            allUFOs.push(ufo);
        }
    }

    function getLane(): number {
        //creating random positions in a lane 
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
        //getting a random number in a given range
        let delta: number = _max - _min;
        let multiplied: number = Math.random() * delta;
        let floored: number = Math.floor(multiplied);

        let answer: number = floored + _min;
        return answer;
    }

    function movePlanets(): void {
        //re-drawing everything at a slightly different position to animate the elements
        ctxPlanet.clearRect(0, 0, canvasPlanet.width, canvasPlanet.height);
        for (let planet of allPlanets) {
            planet.move(2);
            planet.draw(ctxPlanet);
        }

        ctxUfo.clearRect(0, 0, canvasUfo.width, canvasUfo.height);
        for (let ufo of allUFOs) {
            ufo.move(2);
            ufo.draw(ctxUfo);
            //check if the ufo collided with anything
            ufo.checkCollision();
        }

        //check if the rocket collided with anything
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

    function sendRocketPosition(_newPos: number): void {
        //sending the new rocket position to the server if the game is still running
        if (gameover == false) {
            let update: Update = {
                selector: "rocket",
                data: _newPos + ""
            };

            socket.send(JSON.stringify(update));
        }
    }

    function sendPlanetData(_xPos: number, _yPos: number, _size: number, _index: number, _type: string): void {
        // sending all information to create an exact copy of the planet to the server if the game is still running
        if (gameover == false) {
            let update: Update = {
                selector: "planet",
                data: _xPos + "&a&" + _yPos + "&a&" + _size + "&a&" + _index + "&a&" + _type
            };
            socket.send(JSON.stringify(update));
        }
    }

    export function sendDamageUpdate(): void {
        //sending the new damage value to the server
        if (gameover == false) {
            let update: Update = {
                selector: "damage",
                data: rocket.damageStatus + ""
            };
            socket.send(JSON.stringify(update));
        }
    }

    function sendStart(): void {
        //sending the info that the player is ready to the server
        if (gameover == false) {
            let update: Update = {
                selector: "ready",
                data: "user1"
            };
            socket.send(JSON.stringify(update));
        }
    }

    // tslint:disable-next-line: no-any
    function getData(_event: any): void {
        let carrier: Update = <Update>JSON.parse(_event.data);
        let selector: string = carrier.selector;
        let data: string = carrier.data;

        switch (selector) {
            case "ufo":
                let pretty: string[] = data.split("&a&");
                let posX: number = Number(pretty[0]);
                let posY: number = Number(pretty[1]);
                let sizeX: number = Number(pretty[2]);
                let sizeY: number = Number(pretty[3]);
                let index: number = Number(pretty[4]);

                let newUfo: UFO = new UFO(posX, posY, sizeX, sizeY, ufoImg, index);
                ufoIndex = index + 1;
                allUFOs.push(newUfo);
                break;

            case "shoot":
                let ufoIndexNmbr: number = Number(data);
                allUFOs[ufoIndexNmbr].shoot();
                ufoBallIndex++;
                break;
            case "ball":
                let arr: string[] = data.split("&a&");
                let ind: number = Number(arr[0]);
                let elevationX: number = Number(arr[1]);
                let elevationY: number = Number(arr[2]);

                let ball: Ball = new Ball(rocket.newPos, rocket.startPosY, ind, "lightgreen");
                ball.getElevation(elevationX, elevationY);
                ball.draw();
                rocketLaserpoints.push(ball);
                break;
            case "damage":
                let damageValue: number = Number(data);
                rocket.damageStatus = damageValue;
                rocket.drawRocket();
                break;
            case "ready":
                console.log(readyCount);
                readyCount++;
                if (readyCount == 3) {
                    startGame();

                }

                break;
        }
    }
}