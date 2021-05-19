"use strict";
var prototype04;
(function (prototype04) {
    class Rocket extends prototype04.CanvasObject {
        constructor(_x, _y, _image, _imageStageTwo, _imageStageThree) {
            super(_x, _y, _image);
            this.imageStageTwo = _imageStageTwo;
            this.imageStageThree = _imageStageThree;
            this.damageStatus = 0;
            this.size = new prototype04.Vector(50, 100);
        }
        draw() {
            switch (this.damageStatus) {
                case (0):
                    prototype04.ctxRocket.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
                    break;
                case (1):
                    prototype04.ctxRocket.drawImage(this.imageStageTwo, this.position.x, this.position.y, this.size.x, this.size.y);
                    break;
                case (2):
                    prototype04.ctxRocket.drawImage(this.imageStageThree, this.position.x, this.position.y, this.size.x, this.size.y);
                    break;
            }
        }
        setSize(_x, _y) {
            super.setSize(_x, _y);
        }
        move(_add) {
            let width = prototype04.canvasRocket.width;
            if (this.position.x < 50) {
                this.position.x = 50;
            }
            else if (this.position.x > width - 50) {
                this.position.x = width - 50;
            }
            if (this.position.x < width / 10 || this.position.x > (width * 0.9)) {
                this.position.x = this.position.x + _add;
            }
            else {
                this.position.x = this.position.x + _add * 1.5;
            }
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