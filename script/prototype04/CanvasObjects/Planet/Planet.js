"use strict";
var prototype04;
(function (prototype04) {
    class Planet extends prototype04.CanvasObject {
        constructor(_x, _y, _image, _size) {
            if (_size) {
                super(_x, _y, _image, _size);
            }
            else {
                super(_x, _y, _image);
            }
        }
        draw() {
            if (this.size)
                prototype04.ctxBackground.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
            else
                prototype04.ctxBackground.drawImage(this.image, this.position.x, this.position.y);
        }
        setSize(_x, _y) {
            super.setSize(_x, _y);
        }
        move(_add) {
            this.position.y += _add;
        }
    }
    prototype04.Planet = Planet;
})(prototype04 || (prototype04 = {}));
//# sourceMappingURL=Planet.js.map