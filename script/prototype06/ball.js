"use strict";
var prototype06;
(function (prototype06) {
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
        draw() {
            prototype06.ctxPoint.clearRect(0, 0, prototype06.canvasPoint.width, prototype06.canvasPoint.height + 150);
            prototype06.ctxPoint.save();
            prototype06.ctxPoint.beginPath();
            prototype06.ctxPoint.strokeStyle = "red";
            prototype06.ctxPoint.fillStyle = "red";
            prototype06.ctxPoint.lineWidth = 2;
            prototype06.ctxPoint.arc(this.positionX, this.positionY, 5, 0, 2 * Math.PI, true);
            prototype06.ctxPoint.globalCompositeOperation = "lighter";
            prototype06.ctxPoint.shadowColor = "pink";
            prototype06.ctxPoint.lineWidth = 8;
            prototype06.ctxPoint.shadowOffsetX = 2;
            prototype06.ctxPoint.shadowOffsetY = 2;
            prototype06.ctxPoint.shadowBlur = 15;
            prototype06.ctxPoint.strokeStyle = "#ffffff88";
            prototype06.ctxPoint.stroke();
            prototype06.ctxPoint.fill();
            prototype06.ctxPoint.closePath();
            prototype06.ctxPoint.restore();
        }
    }
    prototype06.Ball = Ball;
})(prototype06 || (prototype06 = {}));
//# sourceMappingURL=ball.js.map