namespace prototype03 {
    //canvas Element and rendering context to draw on canvas
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    //width and height of the window
    let width: number;
    export let height: number;

    //The middle-position of the green box
    let startPos: number;
    let newPos: number; 

    //The canvas will be divides in three "lanes". This is where the planets will be
    //When a new planet is created, a random lane is picked
    let lanes: string[] = ["right", "right", "left", "left", "middle"];

    //All images for the planets are pushed into an array
    let allImg: HTMLImageElement[] = [];
    //To be able to access all Planets, they are pushed into an array
    export let allPlanets: Planet[] = [];

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
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        //To get the correct size of the screen, we select the html-Element and get its width and height
        let html: HTMLElement = <HTMLElement>document.querySelector("html");
        width = html.clientWidth;
        height = html.clientHeight;

        //To make the canvas as big as the screen, the width and height of the html are applied to it
        canvas.setAttribute("width", width + "px");
        canvas.setAttribute("height", height + "px");

        //Preparing the position of the box. The box should be in the middle, 
        //so we are dividing the width by two and subtracting half of the width the box will have
        startPos = (width / 2) - 25;
        newPos = startPos;

        //To prepare the canvas, a white rectangle is drawn on it covering the whole canvas
        //Then the box is drawn
        drawRectangle(startPos);
        getAllImg();

        update(); 
    }

    function getAllImg(): void {
        let allImages: NodeListOf<HTMLImageElement> = document.querySelectorAll("img");

        for (let i: number = 0; i < allImages.length; i++) {
            allImg.push(allImages[i]);
        }
    }

    function update(): void {
        let random: number = getRandom(3000, 7000); 
        window.setInterval( function(): void {
            createPlanet(); 
        },                  random);  
        window.setInterval(movePlanets, 40); 
    }

    //Function called when the mobile device is moving
    function handleMove(_event: DeviceOrientationEvent): void {
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas

            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            newPos = startPos + (_event.gamma * 2);
            //And the box is drawn
            drawRectangle(newPos);
        }
    }

    function drawRectangle(_startX: number): void {
        let _startY: number = height / 2 - 45;
        ctx.beginPath();
        ctx.strokeStyle = "lightgreen";
        ctx.fillStyle = "lightgreen";
        ctx.rect(_startX, _startY, 50, 50);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRectangle(newPos);
        for (let planet of allPlanets) {
            planet.move(2);
            planet.draw(ctx);
        }
    }

}