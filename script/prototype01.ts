namespace prototype01 {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let width: number;
    let height: number; 

    const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
    motionManager.onRotationRate = onRotationRate;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
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

    function onRotationRate(_alpha: number, _beta: number, _gamma: number): void {
        ctx.beginPath();
        ctx.fillStyle = "white"; 
        ctx.strokeStyle = "white";
        ctx.rect(0, 0, width, height);
        ctx.stroke();

        alert("Rotation"); 
        alert(_alpha +  _beta + _gamma); 
    }
}