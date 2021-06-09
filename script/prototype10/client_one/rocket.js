"use strict";
var prototype10_One;
(function (prototype10_One) {
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
            prototype10_One.ctxRocket.clearRect(0, 0, prototype10_One.canvasRocket.width, prototype10_One.canvasRocket.height + 150);
            if (this.damageStatus == 0) {
                prototype10_One.ctxRocket.drawImage(this.image, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
            else if (this.damageStatus == 1) {
                prototype10_One.ctxRocket.drawImage(this.imageDamageOne, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
            else if (this.damageStatus == 2) {
                prototype10_One.ctxRocket.drawImage(this.imageDamageTwo, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
        }
        damageUpdate() {
            this.damageStatus++;
            this.drawRocket();
            prototype10_One.sendDamageUpdate();
            if (this.damageStatus >= 3) {
                prototype10_One.ufoLaserpoints = [];
                prototype10_One.rocketLaserpoints = [];
                prototype10_One.allPlanets = [];
                prototype10_One.allUFOs = [];
                prototype10_One.gameover = true;
                location.reload();
            }
        }
        checkCollision() {
            for (let planet of prototype10_One.allPlanets) {
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
            for (let ufo of prototype10_One.allUFOs) {
                let minX = ufo.positionX;
                let maxX = ufo.positionX + ufo.sizeX;
                let minY = ufo.positionY;
                let maxY = ufo.positionY + ufo.sizeY;
                if (ufo.didDamage == false) {
                    if (this.newPos <= maxX && minX <= (this.newPos + this.sizeX) && this.startPosY <= maxY && minY <= (this.startPosY + this.sizeY)) {
                        this.damageUpdate();
                        ufo.didDamage = true;
                        let index = prototype10_One.allUFOs.indexOf(ufo);
                        prototype10_One.allUFOs.splice(index, 1);
                    }
                }
            }
            for (let ball of prototype10_One.ufoLaserpoints) {
                let minX = ball.positionX;
                let maxX = ball.positionX + 10;
                let minY = ball.positionY;
                let maxY = ball.positionY + 10;
                if (ball.didDamage == false) {
                    if (this.newPos <= maxX && minX <= (this.newPos + this.sizeX) && this.startPosY <= maxY && minY <= (this.startPosY + this.sizeY)) {
                        this.damageUpdate();
                        ball.didDamage = true;
                        let index = prototype10_One.ufoLaserpoints.indexOf(ball);
                        prototype10_One.ufoLaserpoints.splice(index, 1);
                    }
                }
            }
        }
    }
    prototype10_One.Rocket = Rocket;
})(prototype10_One || (prototype10_One = {}));
//# sourceMappingURL=rocket.js.map