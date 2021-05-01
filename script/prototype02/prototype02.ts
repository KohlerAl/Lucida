namespace prototype02 {
    //canvas Element and rendering context to draw on canvas
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    //width and height of the window
    let width: number;
    let height: number;

    //The middle-position of the green box
    let startPos: number;
    let startPosY: number;

    let gamma: number = -90; 
    let div: HTMLDivElement; 

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

        //The canvas and the rendering divs and assigning the values to the prepared variables
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
        startPosY = height / 2 - 45;
        

        //To prepare the canvas, a white rectangle is drawn on it covering the whole canvas
        undoCanvas();
        //Then the box is drawn
        drawCanon(startPos, startPosY);
        drawCanonBarrel(startPos, startPosY);
        getStart(); 
    }

    //Function called when the mobile device is moving
    function handleMove(_event: DeviceOrientationEvent): void {
        //Check if the value we need is there
        if (_event.gamma) {
            //To remove the old rectangle, a white rectangle is drawn covering the whole canvas
            undoCanvas();

            //The new position (= movement of device on the y-Axis) is added to the startPosition (middle Position)
            let rotation: number = 270 + _event.gamma;
            

            if (rotation < 225) {
                rotation = 225;
            }
            else if (rotation > 315) {
                rotation = 315;
            }
            gamma = rotation; 
            div = <HTMLDivElement>document.querySelector("#box");
            div.innerHTML = rotation + "";

            drawCanonBarrel(startPos, startPosY, rotation);
            drawCanon(startPos, startPosY);
            getStart(); 
        }
    }

    function undoCanvas(): void {
        ctx.beginPath();
        ctx.fillStyle = "#777777";
        ctx.strokeStyle = "#777777";
        ctx.rect(0, 0, width, height);
        ctx.fill();
        ctx.closePath();
    }

    function drawCanon(_startX: number, _startY: number): void {
        ctx.beginPath();
        ctx.strokeStyle = "darkgrey";
        ctx.fillStyle = "lightgrey";
        ctx.lineWidth = 10;
        ctx.arc(_startX, _startY, 50, 0, 1 * Math.PI, true);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = "darkgrey";
        ctx.fillStyle = "grey";
        ctx.rect(_startX - 100, _startY, 200, 50);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

    }

    function drawCanonBarrel(_startX: number, _startY: number, _rotation: number = 270): void {
        ctx.save();
        ctx.translate(_startX - 5, _startY - 50);
        ctx.beginPath();
        ctx.rotate(_rotation * Math.PI / 180);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillStyle = "black";
        ctx.rect(0, 0, 100, 10);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    function getStart(): void {
        let startX: number = startPos - 5;
        let startY: number = startPosY - 50;  
        let distance: number = 100; 
        let x: number = distance * (Math.cos(gamma)); 
        let y: number = distance * (Math.sin(gamma)); 
        let endX: number = startX + x; 
        let endY: number = startY + y; 

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.lineWidth = 2;
        ctx.arc(endX, endY, 5, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        div.innerHTML += "  " + endX + "   " + endY; 
        console.log(endX, endY); 
    }
}