"use strict";
var prototype10_One;
(function (prototype10_One) {
    class Planet {
        constructor(_x, _y, _image, _size, _index) {
            this.didDamage = false;
            this.posX = _x;
            this.posY = _y;
            this.image = _image;
            this.size = _size;
            this.index = _index;
        }
        move(_add) {
            this.posY += _add;
            if (this.posY > prototype10_One.height * 2) {
                let index = prototype10_One.allPlanets.indexOf(this);
                prototype10_One.allPlanets.splice(index, 1);
            }
        }
        draw(_ctx) {
            _ctx.drawImage(this.image, this.posX, this.posY, this.size, this.size);
        }
    }
    prototype10_One.Planet = Planet;
})(prototype10_One || (prototype10_One = {}));
//# sourceMappingURL=planet.js.map