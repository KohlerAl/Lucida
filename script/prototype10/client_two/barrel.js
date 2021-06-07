"use strict";
var prototype10_Two;
(function (prototype10_Two) {
    class Barrel {
        constructor(_x, _y, _rotaion, _image) {
            this.positionX = _x;
            this.positionY = _y;
            this.rotation = _rotaion;
            this.image = _image;
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
            prototype10_Two.ctxBarrel.clearRect(0, 0, prototype10_Two.canvasBarrel.width, prototype10_Two.canvasBarrel.height + 150);
            prototype10_Two.ctxBarrel.save();
            prototype10_Two.ctxBarrel.translate(prototype10_Two.rocket.newPos + 30, prototype10_Two.rocket.startPosY - 50);
            prototype10_Two.ctxBarrel.beginPath();
            prototype10_Two.ctxBarrel.rotate(this.rotation * Math.PI / 180);
            prototype10_Two.ctxBarrel.strokeStyle = "black";
            prototype10_Two.ctxBarrel.lineWidth = 2;
            prototype10_Two.ctxBarrel.fillStyle = "black";
            prototype10_Two.ctxBarrel.rect(0, 0, 100, 10);
            prototype10_Two.ctxBarrel.stroke();
            prototype10_Two.ctxBarrel.fill();
            prototype10_Two.ctxBarrel.closePath();
            prototype10_Two.ctxBarrel.restore();
        }
    }
    prototype10_Two.Barrel = Barrel;
})(prototype10_Two || (prototype10_Two = {}));
//# sourceMappingURL=barrel.js.map