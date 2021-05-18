"use strict";
var prototype04;
(function (prototype04) {
    class CanvasObject {
        constructor(_x, _y, _image, _size) {
            this.position = new prototype04.Vector(_x, _y);
            this.image = _image;
            if (_size) {
                this.size = _size;
            }
        }
        setSize(_x, _y) {
            this.size = new prototype04.Vector(_x, _y);
        }
        move(_add) {
            this.position.x += _add;
            this.position.y += _add;
        }
    }
    prototype04.CanvasObject = CanvasObject;
})(prototype04 || (prototype04 = {}));
//# sourceMappingURL=CanvasObject.js.map