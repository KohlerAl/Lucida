"use strict";
var prototype03;
(function (prototype03) {
    class Planet {
        constructor(_x, _y, _image, _size) {
            this.posX = _x;
            this.posY = _y;
            this.image = _image;
            if (_size) {
                this.size = _size;
            }
        }
        move(_add) {
            this.posY += _add;
            if (this.posY > prototype03.height * 2) {
                let index = prototype03.allPlanets.indexOf(this);
                prototype03.allPlanets.splice(index, 1);
            }
        }
        draw(_ctx) {
            if (this.size)
                _ctx.drawImage(this.image, this.posX, this.posY, this.size, this.size);
            else
                _ctx.drawImage(this.image, this.posX, this.posY);
        }
    }
    prototype03.Planet = Planet;
})(prototype03 || (prototype03 = {}));
//# sourceMappingURL=Planet.js.map