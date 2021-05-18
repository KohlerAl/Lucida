"use strict";
var prototype04;
(function (prototype04) {
    class Rocket extends prototype04.CanvasObject {
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
        updateDamage() {
            //Check if damage is fatal or update damageStatus
        }
        setNewPosition(_gamma) {
            this.newPosition.x = this.position.x + (_gamma * 2);
            this.newPosition.y = this.position.y + (_gamma * 2);
        }
    }
    prototype04.Rocket = Rocket;
})(prototype04 || (prototype04 = {}));
//# sourceMappingURL=Rocket.js.map