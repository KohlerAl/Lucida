"use strict";
var prototype10_Two;
(function (prototype10_Two) {
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
            let ball = new prototype10_Two.Ball(this.positionX, this.positionY, prototype10_Two.ufoBallIndex);
            if (_directionX && _directionY) {
                ball.getElevation(_directionX, _directionY);
            }
            else {
                ball.getElevation(prototype10_Two.rocket.newPos, prototype10_Two.rocket.startPosY);
            }
            prototype10_Two.ufoLaserpoints.push(ball);
        }
        draw(_ctx) {
            _ctx.drawImage(this.image, this.positionX, this.positionY, this.sizeX, this.sizeY);
        }
        move(_add) {
            this.positionY += _add;
            if (this.positionY > prototype10_Two.height * 2) {
                let index = prototype10_Two.allUFOs.indexOf(this);
                prototype10_Two.allUFOs.splice(index, 1);
            }
        }
    }
    prototype10_Two.UFO = UFO;
})(prototype10_Two || (prototype10_Two = {}));
//# sourceMappingURL=ufo.js.map