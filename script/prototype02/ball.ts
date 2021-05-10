namespace prototype02 {
    export class Ball {
        positionX: number;
        positionY: number;

        distance: number = 0;
        angle: number = 0;
        speed: number = 2;

        velocityX: number;
        velocityY: number;

        constructor(_positionX: number, _positionY: number) {
            this.positionX = _positionX;
            this.positionY = _positionY;
        }

        public getElevation(_endX: number, _endY: number): void {
            //Warning: Maths involved, i have no idea what i am doing 
            let ty: number = _endY - this.positionY;
            let tx: number = _endX - this.positionX;

            this.distance = Math.sqrt(tx * tx + ty * ty);
            let rad: number = Math.atan2(ty, tx);
            this.angle = rad / Math.PI * 180;

            this.velocityX = (tx / this.distance) * this.speed;
            this.velocityY = (ty / this.distance) * this.speed;

        }

        public move(): void {
            this.positionX += this.velocityX;
            this.positionY += this.velocityY;
        }

        public draw(_ctx: CanvasRenderingContext2D): void {
            _ctx.save();
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
            _ctx.restore();
        }
    }
}