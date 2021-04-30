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
        div = <HTMLDivElement>document.querySelector("#box");
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.style.width = width + "px";
        canvas.style.width = height + "px";

        lastPos = width / 2;
        undoCanvas();
        drawRectangle(width / 2 - 5);
    }

    function handleMove(_event: DeviceOrientationEvent): void {
        if (_event.gamma) {
            undoCanvas();
            let newPos: number = lastPos + _event.gamma;
            div.innerHTML = width + ""; 
            div.innerHTML += newPos + "<br>"; 
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
        ctx.beginPath();
        ctx.strokeStyle = "lightgreen";
        ctx.fillStyle = "lightgreen";
        ctx.rect(_startX, 20, 10, 20);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

}