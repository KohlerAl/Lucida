"use strict";
var prototype08;
(function (prototype08) {
    class Planet {
        constructor(_x, _y, _image, _size) {
            this.didDamage = false;
            this.posX = _x;
            this.posY = _y;
            this.image = _image;
            this.size = _size;
        }
        move(_add) {
            this.posY += _add;
            if (this.posY > prototype08.height * 2) {
                let index = prototype08.allPlanets.indexOf(this);
                prototype08.allPlanets.splice(index, 1);
            }
        }
        draw(_ctx) {
            _ctx.drawImage(this.image, this.posX, this.posY, this.size, this.size);
        }
    }
    prototype08.Planet = Planet;
})(prototype08 || (prototype08 = {}));
//# sourceMappingURL=planet.js.map