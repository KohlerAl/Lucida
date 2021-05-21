"use strict";
var prototype07;
(function (prototype07) {
    class Rocket {
        constructor(_startPosX, _startPosY, _image) {
            this.sizeX = 50;
            this.sizeY = 100;
            this.damageStatus = 0;
            this.startPosX = _startPosX;
            this.startPosY = _startPosY;
            this.image = _image;
            this.newPos = this.startPosX;
        }
        move(_add) {
            this.newPos = this.startPosX + (_add * 2);
        }
        drawRocket() {
            prototype07.ctxR.clearRect(0, 0, prototype07.canvasRocket.width, prototype07.canvasRocket.height + 150);
            prototype07.ctxR.drawImage(this.image, this.newPos, this.startPosY, this.sizeX, this.sizeY);
        }
        damageUpdate() {
            this.damageStatus++;
            if (this.damageStatus <= 3) {
                window.alert("The Rocket is irreparable damaged");
            }
        }
        checkCollision() {
            for (let planet of prototype07.allPlanets) {
                let minX = planet.posX;
                let maxX = planet.posX + planet.size;
                let minY = planet.posY;
                let maxY = planet.posY + planet.size;
                /* if (planet.didDamage == false) {
                    if (this.newPos > minX && this.newPos < maxX && this.startPosY > minY && this.startPosY < maxY) {
                        this.damageUpdate();
                        console.log("rocket hit");
                        planet.didDamage = true;
                    }
                } */
                if (planet.didDamage == false) {
                    if (this.newPos <= maxX && minX <= (this.newPos + this.sizeX) && this.startPosY <= maxY && minY <= (this.startPosY + this.sizeY)) {
                        console.log("rocket hit");
                        this.damageUpdate();
                        planet.didDamage = true;
                    }
                }
            }
        }
    }
    prototype07.Rocket = Rocket;
})(prototype07 || (prototype07 = {}));
//# sourceMappingURL=rocket.js.map