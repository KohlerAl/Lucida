"use strict";
var prototype10_One;
(function (prototype10_One) {
    class Rocket {
        constructor(_startPosX, _startPosY, _image, _imageDamageOne, _imageDamageTwo) {
            //The size we need to scale the rocket to a good size
            this.sizeX = 50;
            this.sizeY = 100;
            //The damage the rocket has taken. At the start of the game, it is 0.
            this.damageStatus = 0;
            //Setting variables to the given values
            this.startPosX = _startPosX;
            this.startPosY = _startPosY;
            this.image = _image;
            this.imageDamageOne = _imageDamageOne;
            this.imageDamageTwo = _imageDamageTwo;
            //At first, we copy the the start position, so the rocket will start to fly in the middle of the screen 
            this.newPos = this.startPosX;
        }
        move(_add) {
            //_add is the _event.gamma value of the DeviceOrientationEvent. We mulitply it by two so that the rocket has more room to move
            this.newPos = this.startPosX + (_add * 2);
        }
        drawRocket() {
            //clearing the canvas
            prototype10_One.ctxRocket.clearRect(0, 0, prototype10_One.canvasRocket.width, prototype10_One.canvasRocket.height + 150);
            //depending on the damage of the rocket, it is drawn with a different image
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
            //The damage status is increased, then the rocket is drawn 
            this.damageStatus++;
            this.drawRocket();
            //To make sure both players have the same damge value of the rocket it is sent to the server
            prototype10_One.sendDamageUpdate();
            //In case the damge value is 3, all arrays are cleared and the page is reloaded -> game over
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
            //checking the collision with the planets, ufos and the laserpoints 
            for (let planet of prototype10_One.allPlanets) {
                //creating a hitbox around the planet (the position is the upper left corner of the box, so we need to add the size in x and y direction)
                let minX = planet.posX;
                let maxX = planet.posX + planet.size;
                let minY = planet.posY;
                let maxY = planet.posY + planet.size;
                //The rocket will pass through the planets hitbox, so the rocket will be hit more than once. To avoid that the game is over immediatly, 
                //every planet can only do damage once
                if (planet.didDamage == false) {
                    //Checking if the position of the rocket is in the hitbox of the planet
                    if (this.newPos <= maxX && minX <= (this.newPos + this.sizeX) && this.startPosY <= maxY && minY <= (this.startPosY + this.sizeY)) {
                        this.damageUpdate();
                        planet.didDamage = true;
                    }
                }
            }
            //Following the same principle as above, the ufos and the ufo-laserpoints are checked. Both of them disappear if they did damage (because they are damaged too)
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