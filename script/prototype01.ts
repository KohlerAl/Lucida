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
        canvas.style.width = 100 + "%";
        canvas.style.height = 100 + "%";

        console.log(width, height);
        lastPos = width / 3;
        undoCanvas();
        drawRectangle(width / 2 - 50);

        div.innerHTML = height + ""; 
    }

    function handleMove(_event: DeviceOrientationEvent): void {
        if (_event.gamma) {
            undoCanvas();
            let newPos: number = lastPos + _event.gamma;
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
        let _startY: number = height / 3;
        ctx.beginPath();
        ctx.strokeStyle = "lightgreen";
        ctx.fillStyle = "lightgreen";
        ctx.rect(_startX, _startY, 50, 70);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

}