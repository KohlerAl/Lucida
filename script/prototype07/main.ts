namespace prototype07 {
    let canvasPlanet: HTMLCanvasElement;
    export let canvasRocket: HTMLCanvasElement; 
    let ctxP: CanvasRenderingContext2D;
    export let ctxR: CanvasRenderingContext2D;

    //width and height of the window
    let width: number;
    export let height: number;

    //The canvas will be divided in three "lanes". This is where the planets will be
    //The middle lane has a lower chance of being picked
    //When a new planet is created, a random lane is picked
    let lanes: string[] = ["right", "right", "left", "left", "middle"];

    //All images for the planets are pushed into an array. We need those to draw them onto the canvas
    let allImg: HTMLImageElement[] = [];
    //To be able to access all Planets, they are pushed into an array
    export let allPlanets: Planet[] = [];

    let rocket: Rocket; 

    export let box: HTMLDivElement; 

    // Installing a load- and a deviceorientation-Listener on window
    window.addEventListener("load", handleLoad);
    window.addEventListener("deviceorientation", handleMove);

    function handleLoad(): void {
        // create device motion/orientation manager
        const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        // create start screen and register device motion/orientation manager
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start();

        //Selecting the canvas and the rendering divs and assigning the values to the prepared variables
        canvasPlanet = <HTMLCanvasElement>document.querySelector("#planet");
        ctxP = <CanvasRenderingContext2D>canvasPlanet.getContext("2d");

        canvasRocket = <HTMLCanvasElement>document.querySelector("#rocket"); 
        ctxR = <CanvasRenderingContext2D>canvasRocket.getContext("2d");


        //To get the correct size of the screen, we select the html-Element and get its width and height
        let html: HTMLElement = <HTMLElement>document.querySelector("html");
        width = html.clientWidth;
        height = html.clientHeight;

        //To make the canvas as big as the screen, the width and height of the html are applied to it
        canvasPlanet.setAttribute("width", width + "px");
        canvasPlanet.setAttribute("height", height + "px");

        canvasRocket.setAttribute("width", width + "px");
        canvasRocket.setAttribute("height", height + "px");

        //Preparing the position of the rocket. Right now without any movement, the startPos and currentPos are the same
        let startPos: number  = (width / 2) - 25;
        let startY: number = height / 2 + 60;
        let img: HTMLImageElement = <HTMLImageElement>document.querySelector(".rocket"); 

        rocket = new Rocket (startPos, startY, img); 

        //The rocket is drawn
        rocket.drawRocket();
        //We can now acces all the images. We need to select them first
        getAllImg();

        //To create an Animation, we have to keep upadting the canvas
        update(); 

        box = <HTMLDivElement>document.querySelector("#box"); 
    }

    function getAllImg(): void {
        //All Images with the class planet are selected and pushed into the prepared Array
        let allImages: NodeListOf<HTMLImageElement> = document.querySelectorAll(".planet");

        for (let i: number = 0; i < allImages.length; i++) {
            allImg.push(allImages[i]);
        }
    }

    function update(): void {
        //Every two to five seconds a new planet is drawn 
        let random: number = getRandom(1000, 3500); 
        window.setInterval( function(): void {
            createPlanet(); 
            random = getRandom(1000, 3500); 
        },                  random);  
        //Every 40ms the image is updated 
        window.setInterval(movePlanets, 40); 
    }

    //Function called when the mobile device is moving
    function handleMove(_event: DeviceOrientationEvent): void {
        //Check if the value we need is there
        if (_event.gamma) {
            rocket.move(_event.gamma);
            rocket.drawRocket(); 
        }
    }

    function createPlanet(): void {
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
        let randomNmbr: number = Math.floor(Math.random() * allImg.length);
        let img: HTMLImageElement = allImg[randomNmbr];

        let randomSize: number = getRandom(50, 120); 
        let planet: Planet = new Planet(xPos, -50, img, randomSize);
        allPlanets.push(planet); 
    }

    function getRandom(_min: number, _max: number): number {
        let delta: number = _max - _min;

        let random: number = Math.random();
        let multiplied: number = random * delta;
        let floored: number = Math.floor(multiplied);

        let answer: number = floored + _min;
        return answer;
    }


    function movePlanets(): void {
        ctxP.clearRect(0, 0, canvasPlanet.width, canvasPlanet.height);
        for (let planet of allPlanets) {
            planet.move(2);
            planet.draw(ctxP);
        }

        rocket.checkCollision(); 
    }
}