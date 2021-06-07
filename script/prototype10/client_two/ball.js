"use strict";
var prototype10_Two;
(function (prototype10_Two) {
    class Ball {
        constructor(_positionX, _positionY, _index) {
            this.distance = 0;
            this.angle = 0;
            this.speed = 2;
            this.didDamage = false;
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.index = _index;
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
        draw() {
            prototype10_Two.ctxPoint.save();
            prototype10_Two.ctxPoint.beginPath();
            prototype10_Two.ctxPoint.strokeStyle = "red";
            prototype10_Two.ctxPoint.fillStyle = "red";
            prototype10_Two.ctxPoint.lineWidth = 2;
            prototype10_Two.ctxPoint.arc(this.positionX, this.positionY, 5, 0, 2 * Math.PI, true);
            prototype10_Two.ctxPoint.globalCompositeOperation = "lighter";
            prototype10_Two.ctxPoint.shadowColor = "pink";
            prototype10_Two.ctxPoint.lineWidth = 8;
            prototype10_Two.ctxPoint.shadowOffsetX = 2;
            prototype10_Two.ctxPoint.shadowOffsetY = 2;
            prototype10_Two.ctxPoint.shadowBlur = 15;
            prototype10_Two.ctxPoint.strokeStyle = "#ffffff88";
            prototype10_Two.ctxPoint.stroke();
            prototype10_Two.ctxPoint.fill();
            prototype10_Two.ctxPoint.closePath();
            prototype10_Two.ctxPoint.restore();
        }
    }
    prototype10_Two.Ball = Ball;
})(prototype10_Two || (prototype10_Two = {}));
//# sourceMappingURL=ball.js.map