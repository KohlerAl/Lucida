namespace prototype10_One {
    export class Ball {
        positionX: number;
        positionY: number;

        distance: number = 0;
        angle: number = 0;
        speed: number = 2;

        velocityX: number;
        velocityY: number;

        didDamage: boolean = false; 

        index: number; 
        color: string; 

        constructor(_positionX: number, _positionY: number, _index: number, _color: string) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.index = _index; 
            this.color = _color; 
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
            console.log(this.velocityX, this.velocityY); 

        }

        public move(): void {
            this.positionX += this.velocityX * 5;
            this.positionY += this.velocityY * 5;
        }

        public draw(): void {
            ctxPoint.save();
            ctxPoint.beginPath();
            ctxPoint.strokeStyle = this.color;
            ctxPoint.fillStyle = this.color;
            ctxPoint.lineWidth = 2;
            ctxPoint.arc(this.positionX, this.positionY, 5, 0, 2 * Math.PI, true);
            ctxPoint.globalCompositeOperation = "lighter";
            ctxPoint.shadowColor = this.color;
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