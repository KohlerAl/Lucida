"use strict";
var prototype04;
(function (prototype04) {
    class UFO extends prototype04.CanvasObject {
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
        handleShoot() {
            //randomly start shooting every few seconds
        }
        updateDamage() {
            //Check if damage is fatal or update damageStatus
        }
    }
    prototype04.UFO = UFO;
})(prototype04 || (prototype04 = {}));
//# sourceMappingURL=Ufo.js.map