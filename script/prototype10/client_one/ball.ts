namespace prototype10_One {
    export class Ball {
        //Creating the attributes we need. We need some more attributes for the calculation of the way 
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
            //Setting the attributes to the given values
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.index = _index; 
            this.color = _color; 
        }

        public getElevation(_endX: number, _endY: number): void {
            //We want the ball to fly in a straight line. We have to points of that line: the rocket-postion and the point where the user touched the screen or the ufo-position 
            //and the position of the rocket. So we calculate the values we need to add to the x and y position
            let ty: number = _endY - this.positionY;
            let tx: number = _endX - this.positionX;

            this.distance = Math.sqrt(tx * tx + ty * ty);
            let rad: number = Math.atan2(ty, tx);
            this.angle = rad / Math.PI * 180;

            this.velocityX = (tx / this.distance) * this.speed;
            this.velocityY = (ty / this.distance) * this.speed;

        }

        public move(): void {
            //The ball moves on the line we calculated earlier so now we can add the values (and multiply them with 4 so the balls are faster)
            this.positionX += this.velocityX * 4;
            this.positionY += this.velocityY * 4;
        }

        public draw(): void {
            //Drawing a glowy ball in the given color (the balls of the rocket are green, the balls of the ufos are red)
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