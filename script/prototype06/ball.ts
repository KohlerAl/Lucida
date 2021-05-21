namespace prototype06 {
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

        public draw(): void {
            //ctxPoint.clearRect(0, 0, canvasPoint.width, canvasPoint.height + 150);
            ctxPoint.save();
            ctxPoint.beginPath();
            ctxPoint.strokeStyle = "red";
            ctxPoint.fillStyle = "red";
            ctxPoint.lineWidth = 2;
            ctxPoint.arc(this.positionX, this.positionY, 5, 0, 2 * Math.PI, true);
            ctxPoint.globalCompositeOperation = "lighter";
            ctxPoint.shadowColor = "pink";
            ctxPoint.lineWidth = 8;
            ctxPoint.shadowOffsetX = 2;
            ctxPoint.shadowOffsetY = 2;
            ctxPoint.shadowBlur = 15;
            ctxPoint.strokeStyle = "#ffffff88";
            ctxPoint.stroke();
            ctxPoint.fill();
            ctxPoint.closePath();
            ctxPoint.restore();
        }
    }
}