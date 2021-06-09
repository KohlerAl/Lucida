"use strict";
var prototype10_Two;
(function (prototype10_Two) {
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
            prototype10_Two.ctxRocket.clearRect(0, 0, prototype10_Two.canvasRocket.width, prototype10_Two.canvasRocket.height + 150);
            if (this.damageStatus == 0) {
                prototype10_Two.ctxRocket.drawImage(this.image, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
            else if (this.damageStatus == 1) {
                prototype10_Two.ctxRocket.drawImage(this.imageDamageOne, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
            else if (this.damageStatus == 2) {
                prototype10_Two.ctxRocket.drawImage(this.imageDamageTwo, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
        }
        damageUpdate() {
            this.damageStatus++;
            this.drawRocket();
            if (this.damageStatus >= 3) {
                //
            }
        }
        checkCollision() {
            for (let planet of prototype10_Two.allPlanets) {
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
            for (let ufo of prototype10_Two.allUFOs) {
                let minX = ufo.positionX;
                let maxX = ufo.positionX + ufo.sizeX;
                let minY = ufo.positionY;
                let maxY = ufo.positionY + ufo.sizeY;
                if (ufo.didDamage == false) {
                    if (this.newPos <= maxX && minX <= (this.newPos + this.sizeX) && this.startPosY <= maxY && minY <= (this.startPosY + this.sizeY)) {
                        this.damageUpdate();
                        ufo.didDamage = true;
                        let index = prototype10_Two.allUFOs.indexOf(ufo);
                        prototype10_Two.allUFOs.splice(index, 1);
                    }
                }
            }
            for (let ball of prototype10_Two.ufoLaserpoints) {
                let minX = ball.positionX;
                let maxX = ball.positionX + 10;
                let minY = ball.positionY;
                let maxY = ball.positionY + 10;
                if (ball.didDamage == false) {
                    if (this.newPos <= maxX && minX <= (this.newPos + this.sizeX) && this.startPosY <= maxY && minY <= (this.startPosY + this.sizeY)) {
                        this.damageUpdate();
                        ball.didDamage = true;
                        let index = prototype10_Two.ufoLaserpoints.indexOf(ball);
                        prototype10_Two.ufoLaserpoints.splice(index, 1);
                    }
                }
            }
        }
    }
    prototype10_Two.Rocket = Rocket;
})(prototype10_Two || (prototype10_Two = {}));
//# sourceMappingURL=rocket.js.map