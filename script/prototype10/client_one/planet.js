"use strict";
var prototype10_One;
(function (prototype10_One) {
    class Planet {
        constructor(_x, _y, _image, _size, _index, _type) {
            this.didDamage = false;
            //Setting the attributes to the given values
            this.posX = _x;
            this.posY = _y;
            this.image = _image;
            this.size = _size;
            this.index = _index;
            this.type = _type;
        }
        move(_add) {
            //moving the planet and checking if it is still on the canvas. if not, it is removed from the array
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