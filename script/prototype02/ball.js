"use strict";
var prototype02;
(function (prototype02) {
    class Ball {
        constructor(_positionX, _positionY) {
            this.speedX = 0;
            this.speedY = 0;
            this.elevation = 0;
            this.distance = 0;
            this.angle = 0;
            this.velocity = 2;
            this.positionX = _positionX;
            this.positionY = _positionY;
        }
        getElevation(_endX, _endY) {
            //Warning: Maths involved, i have no idea what i am doing 
            let y = _endY - this.positionY;
            let x = _endX - this.positionX;
            //Getting the distance
            this.distance = Math.sqrt(x * x + y * y);
            //Getting the Angle
            this.angle = (Math.atan2(x, y) * 180 / Math.PI);
            let angleRadians = (this.angle * Math.PI) / 180;
            this.speedX = this.velocity * (Math.cos(angleRadians));
            this.speedY = this.velocity * (Math.sin(angleRadians));
            if (this.angle < 0) {
                this.speedY = this.speedY - (this.speedY * 2);
                this.speedX = this.speedX - (this.speedX * 2);
            }
            console.log(this.distance, this.angle, this.speedX, this.speedY);
        }
        move() {
            this.positionX += this.speedX;
            this.positionY += this.speedY;
        }
        draw(_ctx) {
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
    prototype02.Ball = Ball;
})(prototype02 || (prototype02 = {}));
//# sourceMappingURL=ball.js.map