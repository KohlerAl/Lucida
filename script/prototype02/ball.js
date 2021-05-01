"use strict";
var prototype02;
(function (prototype02) {
    class Ball {
        constructor(_positionX, _positionY) {
            this.elevation = 0;
            this.positionX = _positionX;
            this.positionY = _positionY;
        }
        getElevation(_endX, _endY) {
            let y = _endY - this.positionY;
            let x = _endX - this.positionX;
            this.elevation = x / y;
        }
        move() {
            this.positionX += this.elevation;
            this.positionY += this.elevation;
        }
        draw(_ctx) {
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
        }
    }
    prototype02.Ball = Ball;
})(prototype02 || (prototype02 = {}));
//# sourceMappingURL=ball.js.map