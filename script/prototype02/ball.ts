namespace prototype02 {
    export class Ball {
        positionX: number;
        positionY: number;

        speedX: number = 0;
        speedY: number = 0;

        elevation: number = 0;
        distance: number = 0;
        angle: number = 0;
        velocity: number = 2;

        constructor(_positionX: number, _positionY: number) {
            this.positionX = _positionX;
            this.positionY = _positionY;
        }

        public getElevation(_endX: number, _endY: number): void {
            //Warning: Maths involved, i have no idea what i am doing 
            let y: number = _endY - this.positionY;
            let x: number = _endX - this.positionX;

            //Getting the distance
            this.distance = Math.sqrt(x * x + y * y);
            //Getting the Angle
            this.angle = (Math.atan2(x, y) * 180 / Math.PI) ;

            let angleRadians: number = (this.angle * Math.PI) / 180;
            this.speedX = this.velocity * (Math.cos(angleRadians));
            this.speedY = this.velocity * (Math.sin(angleRadians));

            if (this.angle < 0) {
                this.speedY = this.speedY - (this.speedY * 2); 
                this.speedX = this.speedX - (this.speedX * 2);  
            }

            console.log(this.distance, this.angle, this.speedX, this.speedY);
        }

        public move(): void {
            this.positionX += this.speedX;
            this.positionY += this.speedY;
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