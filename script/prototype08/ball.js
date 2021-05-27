"use strict";
var prototype08;
(function (prototype08) {
    class Ball {
        constructor(_positionX, _positionY) {
            this.distance = 0;
            this.angle = 0;
            this.speed = 2;
            this.didDamage = false;
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
        draw() {
            prototype08.ctxB.save();
            prototype08.ctxB.beginPath();
            prototype08.ctxB.strokeStyle = "red";
            prototype08.ctxB.fillStyle = "red";
            prototype08.ctxB.lineWidth = 2;
            prototype08.ctxB.arc(this.positionX, this.positionY, 5, 0, 2 * Math.PI, true);
            prototype08.ctxB.globalCompositeOperation = "lighter";
            prototype08.ctxB.shadowColor = "pink";
            prototype08.ctxB.lineWidth = 8;
            prototype08.ctxB.shadowOffsetX = 2;
            prototype08.ctxB.shadowOffsetY = 2;
            prototype08.ctxB.shadowBlur = 15;
            prototype08.ctxB.strokeStyle = "#ffffff88";
            prototype08.ctxB.stroke();
            prototype08.ctxB.fill();
            prototype08.ctxB.closePath();
            prototype08.ctxB.restore();
        }
    }
    prototype08.Ball = Ball;
})(prototype08 || (prototype08 = {}));
//# sourceMappingURL=ball.js.map