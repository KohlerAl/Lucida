namespace prototype06 {
    export let canvasBarrel: HTMLCanvasElement;
    export let ctxBarrel: CanvasRenderingContext2D;

    export let canvasPoint: HTMLCanvasElement;
    export let ctxPoint: CanvasRenderingContext2D;

    //width and height of the window
    export let width: number;
    export let height: number;

    let startPos: number;
    let startPosY: number;

    let gamma: number = -90;
    export let div: HTMLDivElement;

    let barrel: Barrel; 
    let allBalls: Ball[] = []; 

    window.addEventListener("load", handleLoad);
    window.addEventListener("pointerup", getStart);
    window.addEventListener("deviceorientation", handleMove);

    function handleLoad(): void {
        // create device motion/orientation manager
        /* const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        // create start screen and register device motion/orientation manager
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start(); */

        //The canvas and the rendering divs and assigning the values to the prepared variables

        canvasBarrel = <HTMLCanvasElement>document.querySelector("#barrel");
        ctxBarrel = <CanvasRenderingContext2D>canvasBarrel.getContext("2d");

        canvasPoint = <HTMLCanvasElement>document.querySelector("#point");
        ctxPoint = <CanvasRenderingContext2D>canvasPoint.getContext("2d");

        //To get the correct size of the screen, we select the html-Element and get its width and height
        let html: HTMLElement = <HTMLElement>document.querySelector("html");
        width = html.clientWidth;
        height = html.clientHeight;

        //To make the canvas as big as the screen, the width and height of the html are applied to it

        canvasBarrel.setAttribute("width", width + "px");
        canvasBarrel.setAttribute("height", height + "px");

        canvasPoint.setAttribute("width", width + "px");
        canvasPoint.setAttribute("height", height + "px");

        //Preparing the position of the box. The box should be in the middle, 
        //so we are dividing the width by two and subtracting half of the width the box will have
        startPos = (width / 2) - 25;
        startPosY = height / 2 - 45;

        barrel = new Barrel(startPos, startPosY, 270); 
        barrel.draw(); 

        div = <HTMLDivElement>document.querySelector("#box");
        //Then the box is drawn
        window.setInterval(update, 40); 
    }

    function handleMove(_event: DeviceOrientationEvent): void {
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas

            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            barrel.move(_event.gamma); 
            barrel.draw(); 
        }
        for (let ball of allBalls) {
            ball.draw(); 
        }
    }

    function update(): void {
        barrel.draw(); 
        for (let ball of allBalls) {
            ball.move(); 
            ball.draw(); 
        }
    }

    function getStart(_event: PointerEvent): void {
        let startX: number = startPos;
        let startY: number = startPosY - 50;
        let distance: number = 100;
        let x: number = distance * (Math.cos(gamma * Math.PI / 180));
        let y: number = distance * (Math.sin(gamma * Math.PI / 180));
        let endX: number = startX + x;
        let endY: number = startY + y;

        let ball: Ball = new Ball(endX, endY); 
        ball.getElevation(_event.clientX, _event.clientY); 
        div.innerHTML += "X: " + _event.clientX + "\n" + "Y: " + _event.clientY + "\n";
        allBalls.push(ball); 
    }
}