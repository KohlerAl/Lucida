"use strict";
var prototype05;
(function (prototype05) {
    class Planet {
        constructor(_x, _y, _image, _size) {
            this.posX = _x;
            this.posY = _y;
            this.image = _image;
            console.log(this.image);
            if (_size) {
                this.size = _size;
            }
        }
        move(_add) {
            this.posY += _add;
            if (this.posY > prototype05.height * 2) {
                let index = prototype05.allPlanets.indexOf(this);
                prototype05.allPlanets.splice(index, 1);
            }
        }
        draw(_ctx) {
            if (this.size)
                _ctx.drawImage(this.image, this.posX, this.posY, this.size, this.size);
            else
                _ctx.drawImage(this.image, this.posX, this.posY);
        }
    }
    prototype05.Planet = Planet;
})(prototype05 || (prototype05 = {}));
//# sourceMappingURL=planet.js.map