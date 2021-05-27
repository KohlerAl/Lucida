"use strict";
var prototype08;
(function (prototype08) {
    class UFO {
        constructor(_x, _y, _sizeX, _sizeY, _image) {
            this.damage = 0;
            this.positionX = _x;
            this.positionY = _y;
            this.sizeX = _sizeX;
            this.sizeY = _sizeY;
            this.image = _image;
            this.didDamage = false;
        }
        shoot() {
            //Pew pew
            let ball = new prototype08.Ball(this.positionX, this.positionY);
            ball.getElevation(prototype08.rocket.newPos, prototype08.rocket.startPosY);
            prototype08.ufoLaserpoints.push(ball);
        }
        draw(_ctx) {
            _ctx.drawImage(this.image, this.positionX, this.positionY, this.sizeX, this.sizeY);
        }
        move(_add) {
            this.positionY += _add;
            if (this.positionY > prototype08.height * 2) {
                let index = prototype08.allUFOs.indexOf(this);
                prototype08.allUFOs.splice(index, 1);
            }
        }
    }
    prototype08.UFO = UFO;
})(prototype08 || (prototype08 = {}));
//# sourceMappingURL=ufo.js.map