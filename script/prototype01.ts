namespace prototype01 {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let width: number;
    let height: number;
    let div: HTMLDivElement;

    let oldAlpha: number;
    let oldGamma: number;

    /*  const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
     motionManager.onAccelerationIncludingGravity = onAccelerationIncludingGravity;
     motionManager.onAcceleration = onAcceleration;
     motionManager.onRotationRate = onRotationRate;
     motionManager.onOrientation = onOrientation;
 
     const startScreen: StartScreen = new StartScreen("start-screen");
     startScreen.addResourceManager(motionManager);
     startScreen.start(); */

    window.addEventListener("load", handleLoad);
    window.addEventListener("deviceorientation", handleMove);

    function handleLoad(): void {
        div = <HTMLDivElement>document.querySelector("#box");
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.style.width = width + "px";
        canvas.style.width = height + "px";

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.rect(20, 20, 10, 20);
        ctx.stroke();

    }

    function handleMove(_event: DeviceOrientationEvent): void {
        div.innerHTML += " Alpha " + _event.alpha;
        div.innerHTML += " Gamma " + _event.gamma + "<br>";
        
    }

    /* function onRotationRate(_alpha: number, _beta: number, _gamma: number): void {
        /* ctx.beginPath();
        ctx.fillStyle = "white"; 
        ctx.strokeStyle = "white";
        ctx.rect(0, 0, width, height);
        ctx.stroke(); 

        div.innerHTML = "onRotationRate";
    }

    function onAccelerationIncludingGravity(): void {
        div.innerHTML = "onAccelerationIncluding Gravity";
    }

    function onAcceleration(): void {
        div.innerHTML = "onAcceleration";
    }

    function onOrientation(): void {
        div.innerHTML = "onOrientation";
    } */
}