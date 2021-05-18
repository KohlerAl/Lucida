"use strict";
var prototype04;
(function (prototype04) {
    class CanonBarrel extends prototype04.CanvasObject {
        constructor(_x, _y, _image) {
            super(_x, _y, _image);
        }
        draw() {
            //draw UFO
        }
        setSize(_x, _y) {
            super.setSize(_x, _y);
        }
        move(_add) {
            super.move(_add);
        }
        shoot() {
            //shoot Laserpoint
        }
        setAngle(_angle) {
            this.angle = _angle;
        }
    }
    prototype04.CanonBarrel = CanonBarrel;
})(prototype04 || (prototype04 = {}));
//# sourceMappingURL=CanonBarrel.js.map