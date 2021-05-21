"use strict";
var prototype07;
(function (prototype07) {
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
            if (this.posY > prototype07.height * 2) {
                let index = prototype07.allPlanets.indexOf(this);
                prototype07.allPlanets.splice(index, 1);
            }
        }
        draw(_ctx) {
            _ctx.drawImage(this.image, this.posX, this.posY, this.size, this.size);
        }
    }
    prototype07.Planet = Planet;
})(prototype07 || (prototype07 = {}));
//# sourceMappingURL=planet.js.map