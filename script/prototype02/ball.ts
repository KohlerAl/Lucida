namespace prototype02 {
    export class Ball {
        positionX: number;
        positionY: number;

        elevation: number = 0;

        constructor(_positionX: number, _positionY: number) {
            this.positionX = _positionX;
            this.positionY = _positionY;
        }

        public getElevation(_endX: number, _endY: number): void {
            let y: number = _endY - this.positionY;
            let x: number = _endX - this.positionX;

            this.elevation = x / y;
        }

        public move(): void {
            this.positionX += this.elevation;
            this.positionY += this.elevation;  
        }

        public draw(_ctx: CanvasRenderingContext2D): void {
            _ctx.beginPath();
            _ctx.strokeStyle = "red";
            _ctx.fillStyle = "red";
            _ctx.lineWidth = 2;
            _ctx.arc(this.positionX, this.positionY, 5, 0, 2 * Math.PI, true);
            _ctx.globalCompositeOperation = "lighter";
            _ctx.shadowColor = "pink";
            _ctx.lineWidth = 8;
            _ctx.shadowOffsetX = 2;
            _ctx.shadowOffsetY = 2;
            _ctx.shadowBlur = 15;
            _ctx.strokeStyle = "#ffffff88";
            _ctx.stroke();
            _ctx.fill();
            _ctx.closePath();
        }
    }
}