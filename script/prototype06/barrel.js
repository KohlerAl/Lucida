"use strict";
var prototype06;
(function (prototype06) {
    class Barrel {
        constructor(_x, _y, _rotaion) {
            this.positionX = _x;
            this.positionY = _y;
            this.rotation = _rotaion;
        }
        move(_gamma) {
            let rotation = 270 + _gamma;
            if (rotation < 225) {
                rotation = 225;
            }
            else if (rotation > 315) {
                rotation = 315;
            }
            this.rotation = rotation;
        }
        draw() {
            prototype06.ctxBarrel.clearRect(0, 0, prototype06.canvasBarrel.width, prototype06.canvasBarrel.height + 150);
            prototype06.ctxBarrel.save();
            prototype06.ctxBarrel.translate(this.positionX - 5, this.positionY - 50);
            prototype06.ctxBarrel.beginPath();
            prototype06.ctxBarrel.rotate(this.rotation * Math.PI / 180);
            prototype06.ctxBarrel.strokeStyle = "black";
            prototype06.ctxBarrel.lineWidth = 2;
            prototype06.ctxBarrel.fillStyle = "black";
            prototype06.ctxBarrel.rect(0, 0, 100, 10);
            prototype06.ctxBarrel.stroke();
            prototype06.ctxBarrel.fill();
            prototype06.ctxBarrel.closePath();
            prototype06.ctxBarrel.restore();
        }
    }
    prototype06.Barrel = Barrel;
})(prototype06 || (prototype06 = {}));
//# sourceMappingURL=barrel.js.map