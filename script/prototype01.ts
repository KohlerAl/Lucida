namespace prototype01 {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let width: number;
    let height: number;
    let div: HTMLDivElement;
    let lastPos: number;

    window.addEventListener("load", handleLoad);
    window.addEventListener("deviceorientation", handleMove);

    function handleLoad(): void {
        // create device motion/orientation manager
        const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        // create start screen and register device motion/orientation manager
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start();

        div = <HTMLDivElement>document.querySelector("#box");
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        let html: HTMLElement = <HTMLElement>document.querySelector("html");
        width = html.clientWidth;
        canvas.setAttribute("width", width + "px");
        height = html.clientHeight;
        canvas.setAttribute("height", height + "px");

        lastPos = (width / 2) - 25;
        undoCanvas();
        drawRectangle(lastPos);
    }

    function handleMove(_event: DeviceOrientationEvent): void {
        if (_event.gamma) {
            undoCanvas();

            let isPos: number = Math.sign(_event.gamma); 

            let newPos: number = lastPos + (_event.gamma * 2);
            if (newPos < 0 && isPos == -1) {
                newPos = 0;
            }
            else if (newPos > width - 50 && isPos == 1) {
                newPos = width - 50;
            }
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