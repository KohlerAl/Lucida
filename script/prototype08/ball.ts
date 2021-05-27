namespace prototype08 {
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
            ctxB.save();
            ctxB.beginPath();
            ctxB.strokeStyle = "red";
            ctxB.fillStyle = "red";
            ctxB.lineWidth = 2;
            ctxB.arc(this.positionX, this.positionY, 5, 0, 2 * Math.PI, true);
            ctxB.globalCompositeOperation = "lighter";
            ctxB.shadowColor = "pink";
            ctxB.lineWidth = 8;
            ctxB.shadowOffsetX = 2;
            ctxB.shadowOffsetY = 2;
            ctxB.shadowBlur = 15;
            ctxB.strokeStyle = "#ffffff88";
            ctxB.stroke();
            ctxB.fill();
            ctxB.closePath();
            ctxB.restore();
        }
    }
}