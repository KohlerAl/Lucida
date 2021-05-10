"use strict";
var prototype02;
(function (prototype02) {
    class Ball {
        constructor(_positionX, _positionY) {
            this.distance = 0;
            this.angle = 0;
            this.speed = 2;
            this.positionX = _positionX;
            this.positionY = _positionY;
        }
        getElevation(_endX, _endY) {
            //Warning: Maths involved, i have no idea what i am doing 
            let ty = _endY - this.positionY;
            let tx = _endX - this.positionX;
            this.distance = Math.sqrt(tx * tx + ty * ty);
            let rad = Math.atan2(ty, tx);
            this.angle = rad / Math.PI * 180;
            this.velocityX = (tx / this.distance) * this.speed;
            this.velocityY = (ty / this.distance) * this.speed;
        }
        move() {
            this.positionX += this.velocityX;
            this.positionY += this.velocityY;
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