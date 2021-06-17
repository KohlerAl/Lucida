namespace prototype01 {
    //canvas Element and rendering context to draw on canvas
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    //width and height of the window
    let width: number;
    let height: number;

    //The middle-position of the green box
    let startPos: number;

    // Installing a load- and a deviceorientation-Listener on window
    window.addEventListener("load", handleLoad);
    window.addEventListener("deviceorientation", handleMove);

    function handleLoad(): void {
        // create device motion/orientation manager
        /* const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        // create start screen and register device motion/orientation manager
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start(); */

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

        //To prepare the canvas, a white rectangle is drawn on it covering the whole canvas
        undoCanvas();
        //Then the box is drawn
        drawRectangle(startPos);
    }

    //Function called when the mobile device is moving
    function handleMove(_event: DeviceOrientationEvent): void {
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas
            undoCanvas();

            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            let newPos: number = startPos + (_event.gamma * 2);
            //And the box is drawn
            drawRectangle(newPos);
        }
    }

    function undoCanvas(): void {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.rect(0, 0, width, height);
        ctx.fill();
        ctx.closePath();
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

}