namespace prototype04 {
    export class Laserpoint {
        position: Vector; 
        speed: number; 
        distance: number; 
        angle: number; 
        color: string; 
        velocity: Vector; 

        constructor(_x: number, _y: number, _color: string) {
            this.position = new Vector(_x, _y); 
            this.color = _color; 
        }

        public getElevation(_endX: number, _endY: number): void {
            //Warning: Maths involved, i have no idea what i am doing 
            let ty: number = _endY - this.position.y;
            let tx: number = _endX - this.position.x;

            this.distance = Math.sqrt(tx * tx + ty * ty);
            let rad: number = Math.atan2(ty, tx);
            this.angle = rad / Math.PI * 180;

            this.velocity.x = (tx / this.distance) * this.speed;
            this.velocity.y = (ty / this.distance) * this.speed;

        }

        public move(): void {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }

        public draw(_ctx: CanvasRenderingContext2D): void {
            _ctx.save();
            _ctx.beginPath();
            _ctx.strokeStyle = this.color;
            _ctx.fillStyle = this.color;
            _ctx.lineWidth = 2;
            _ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, true);
            _ctx.globalCompositeOperation = "lighter";
            _ctx.shadowColor = "pink";
            _ctx.lineWidth = 5;
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