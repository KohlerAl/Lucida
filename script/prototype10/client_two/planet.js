"use strict";
var prototype10_Two;
(function (prototype10_Two) {
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
            if (this.posY > prototype10_Two.height * 2) {
                let index = prototype10_Two.allPlanets.indexOf(this);
                prototype10_Two.allPlanets.splice(index, 1);
            }
        }
        draw(_ctx) {
            _ctx.drawImage(this.image, this.posX, this.posY, this.size, this.size);
        }
    }
    prototype10_Two.Planet = Planet;
})(prototype10_Two || (prototype10_Two = {}));
//# sourceMappingURL=planet.js.map