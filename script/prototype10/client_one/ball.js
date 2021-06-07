"use strict";
var prototype10_One;
(function (prototype10_One) {
    class Ball {
        constructor(_positionX, _positionY, _index, _color) {
            this.distance = 0;
            this.angle = 0;
            this.speed = 2;
            this.didDamage = false;
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.index = _index;
            this.color = _color;
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
            prototype10_One.ctxPoint.save();
            prototype10_One.ctxPoint.beginPath();
            prototype10_One.ctxPoint.strokeStyle = this.color;
            prototype10_One.ctxPoint.fillStyle = this.color;
            prototype10_One.ctxPoint.lineWidth = 2;
            prototype10_One.ctxPoint.arc(this.positionX, this.positionY, 5, 0, 2 * Math.PI, true);
            prototype10_One.ctxPoint.globalCompositeOperation = "lighter";
            prototype10_One.ctxPoint.shadowColor = this.color;
            prototype10_One.ctxPoint.lineWidth = 8;
            prototype10_One.ctxPoint.shadowOffsetX = 2;
            prototype10_One.ctxPoint.shadowOffsetY = 2;
            prototype10_One.ctxPoint.shadowBlur = 15;
            prototype10_One.ctxPoint.strokeStyle = "#ffffff88";
            prototype10_One.ctxPoint.stroke();
            prototype10_One.ctxPoint.fill();
            prototype10_One.ctxPoint.closePath();
            prototype10_One.ctxPoint.restore();
        }
    }
    prototype10_One.Ball = Ball;
})(prototype10_One || (prototype10_One = {}));
//# sourceMappingURL=ball.js.map