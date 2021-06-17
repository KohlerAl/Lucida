"use strict";
var prototype10_One;
(function (prototype10_One) {
    class UFO {
        constructor(_x, _y, _sizeX, _sizeY, _image, _index) {
            this.damage = 0;
            // Setting the variables to the given values
            this.positionX = _x;
            this.positionY = _y;
            this.sizeX = _sizeX;
            this.sizeY = _sizeY;
            this.image = _image;
            this.didDamage = false;
            this.index = _index;
        }
        //The main-script of the second player randomly lets the ufos shoot. If the ufo shoots, a new laserball is created, which flies in a 
        //straight line starting at the position of the ufo and ending at the postion of the rocket. We can either give a value for the end-position or
        //use the position of the rocket directly
        shoot(_directionX, _directionY) {
            //Pew pew
            let ball = new prototype10_One.Ball(this.positionX, this.positionY, prototype10_One.ufoBallIndex, "pink");
            if (_directionX && _directionY) {
                ball.getElevation(_directionX, _directionY);
            }
            else {
                ball.getElevation(prototype10_One.rocket.newPos, prototype10_One.rocket.startPosY);
            }
            prototype10_One.ufoLaserpoints.push(ball);
        }
        draw(_ctx) {
            _ctx.drawImage(this.image, this.positionX, this.positionY, this.sizeX, this.sizeY);
        }
        //Moving the ufos every frame and checking, if the position is out of the viewport. If yes, the ufo is removed from the array (so we only have visible ufos in the array)
        move(_add) {
            this.positionY += _add;
            if (this.positionY > prototype10_One.height * 2) {
                let index = prototype10_One.allUFOs.indexOf(this);
                prototype10_One.allUFOs.splice(index, 1);
            }
        }
        //The ufos can be damaged by the laserpoints of the rocket. So we need to check if the ufo is hit. If yes, it is destroyed and removed from the array
        checkCollision() {
            for (let ball of prototype10_One.rocketLaserpoints) {
                //Creating the hitbox around the laserpoint
                let minX = ball.positionX;
                let maxX = ball.positionX + 5;
                let minY = ball.positionY;
                let maxY = ball.positionY + 5;
                //Checking if the laserpoint is in the hitbox of the ufo or not
                if (this.positionX <= maxX && minX <= (this.positionX + this.sizeX) && this.positionY <= maxY && minY <= (this.positionY + this.sizeY)) {
                    let index = prototype10_One.allUFOs.indexOf(this);
                    prototype10_One.allUFOs.splice(index, 1);
                }
            }
        }
    }
    prototype10_One.UFO = UFO;
})(prototype10_One || (prototype10_One = {}));
//# sourceMappingURL=ufo.js.map