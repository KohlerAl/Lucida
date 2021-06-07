"use strict";
var prototype10_One;
(function (prototype10_One) {
    class UFO {
        constructor(_x, _y, _sizeX, _sizeY, _image, _index) {
            this.damage = 0;
            this.positionX = _x;
            this.positionY = _y;
            this.sizeX = _sizeX;
            this.sizeY = _sizeY;
            this.image = _image;
            this.didDamage = false;
            this.index = _index;
        }
        shoot(_directionX, _directionY) {
            //Pew pew
            let ball = new prototype10_One.Ball(this.positionX, this.positionY, prototype10_One.ufoBallIndex);
            if (_directionX && _directionY) {
                ball.getElevation(_directionX, _directionY);
            }
            else {
                ball.getElevation(prototype10_One.rocket.newPos, prototype10_One.rocket.startPosY);
            }
            prototype10_One.ufoLaserpoints.push(ball);
        }
        draw(_ctx) {
            _ctx.drawImage(this.image, this.positionX, this.positionY, this.sizeX, this.sizeY);
        }
        move(_add) {
            this.positionY += _add;
            if (this.positionY > prototype10_One.height * 2) {
                let index = prototype10_One.allUFOs.indexOf(this);
                prototype10_One.allUFOs.splice(index, 1);
            }
        }
    }
    prototype10_One.UFO = UFO;
})(prototype10_One || (prototype10_One = {}));
//# sourceMappingURL=ufo.js.map