"use strict";
var prototype08;
(function (prototype08) {
    class Rocket {
        constructor(_startPosX, _startPosY, _image, _imageDamageOne, _imageDamageTwo) {
            this.sizeX = 50;
            this.sizeY = 100;
            this.damageStatus = 0;
            this.startPosX = _startPosX;
            this.startPosY = _startPosY;
            this.image = _image;
            this.imageDamageOne = _imageDamageOne;
            this.imageDamageTwo = _imageDamageTwo;
            this.newPos = this.startPosX;
        }
        move(_add) {
            this.newPos = this.startPosX + (_add * 2);
        }
        drawRocket() {
            prototype08.ctxR.clearRect(0, 0, prototype08.canvasRocket.width, prototype08.canvasRocket.height + 150);
            if (this.damageStatus == 0) {
                prototype08.ctxR.drawImage(this.image, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
            else if (this.damageStatus == 1) {
                prototype08.ctxR.drawImage(this.imageDamageOne, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
            else if (this.damageStatus == 2) {
                prototype08.ctxR.drawImage(this.imageDamageTwo, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
        }
        damageUpdate() {
            this.damageStatus++;
            this.drawRocket();
            if (this.damageStatus >= 3) {
                window.alert("The Rocket is irreparable damaged");
            }
        }
        checkCollision() {
            for (let planet of prototype08.allPlanets) {
                let minX = planet.posX;
                let maxX = planet.posX + planet.size;
                let minY = planet.posY;
                let maxY = planet.posY + planet.size;
                if (planet.didDamage == false) {
                    if (this.newPos <= maxX && minX <= (this.newPos + this.sizeX) && this.startPosY <= maxY && minY <= (this.startPosY + this.sizeY)) {
                        this.damageUpdate();
                        planet.didDamage = true;
                    }
                }
            }
        }
    }
    prototype08.Rocket = Rocket;
})(prototype08 || (prototype08 = {}));
//# sourceMappingURL=rocket.js.map