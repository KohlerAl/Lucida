"use strict";
var prototype10_One;
(function (prototype10_One) {
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
            prototype10_One.ctxBarrel.clearRect(0, 0, prototype10_One.canvasBarrel.width, prototype10_One.canvasBarrel.height + 150);
            prototype10_One.ctxBarrel.save();
            prototype10_One.ctxBarrel.translate(prototype10_One.rocket.newPos + 20, prototype10_One.rocket.startPosY + 50);
            prototype10_One.ctxBarrel.beginPath();
            prototype10_One.ctxBarrel.rotate(this.rotation * Math.PI / 180);
            prototype10_One.ctxBarrel.strokeStyle = "#88888888";
            prototype10_One.ctxBarrel.lineWidth = 2;
            prototype10_One.ctxBarrel.fillStyle = "#88888888";
            prototype10_One.ctxBarrel.rect(0, 0, 100, 10);
            prototype10_One.ctxBarrel.stroke();
            prototype10_One.ctxBarrel.fill();
            prototype10_One.ctxBarrel.closePath();
            prototype10_One.ctxBarrel.restore();
        }
    }
    prototype10_One.Barrel = Barrel;
})(prototype10_One || (prototype10_One = {}));
//# sourceMappingURL=barrel.js.map