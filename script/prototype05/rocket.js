"use strict";
var prototype05;
(function (prototype05) {
    class Rocket {
        constructor(_startPosX, _startPosY, _image) {
            this.sizeX = 50;
            this.sizeY = 100;
            this.startPosX = _startPosX;
            this.startPosY = _startPosY;
            console.log(_startPosX, _startPosY);
            this.image = _image;
            this.newPos = this.startPosX;
        }
        move(_add) {
            this.newPos = this.startPosX + _add;
        }
        drawRocket() {
            prototype05.ctxR.clearRect(0, 0, prototype05.canvasRocket.width, prototype05.canvasRocket.height + 150);
            prototype05.ctxR.drawImage(this.image, this.newPos, this.sizeY, this.sizeX, this.sizeY);
        }
    }
    prototype05.Rocket = Rocket;
})(prototype05 || (prototype05 = {}));
//# sourceMappingURL=rocket.js.map