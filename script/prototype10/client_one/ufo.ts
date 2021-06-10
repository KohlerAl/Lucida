namespace prototype10_One {
    export class UFO {
        //Declaring the needed attributes like position, size, if it has taken damage, the image to be used when the ufo is drawn etc. 
        positionX: number;
        positionY: number;

        sizeX: number;
        sizeY: number;

        damage: number = 0;
        image: HTMLImageElement;

        didDamage: boolean;
        index: number; 

        constructor(_x: number, _y: number, _sizeX: number, _sizeY: number, _image: HTMLImageElement, _index: number) {
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
        shoot(_directionX?: number, _directionY?: number): void {
            //Pew pew
            let ball: Ball = new Ball(this.positionX, this.positionY, ufoBallIndex, "pink");
            if (_directionX && _directionY) {
                ball.getElevation(_directionX, _directionY); 
            }
            else {
                ball.getElevation(rocket.newPos, rocket.startPosY);
            }
            ufoLaserpoints.push(ball);
        }

        draw(_ctx: CanvasRenderingContext2D): void {
            _ctx.drawImage(this.image, this.positionX, this.positionY, this.sizeX, this.sizeY);
        }

        //Moving the ufos every frame and checking, if the position is out of the viewport. If yes, the ufo is removed from the array (so we only have visible ufos in the array)
        move(_add: number): void {

            this.positionY += _add;

            if (this.positionY > height * 2) {
                let index: number = allUFOs.indexOf(this);
                allUFOs.splice(index, 1);
            }

        }

        //The ufos can be damaged by the laserpoints of the rocket. So we need to check if the ufo is hit. If yes, it is destroyed and removed from the array
        checkCollision(): void {
            for (let ball of rocketLaserpoints) {
                //Creating the hitbox around the laserpoint
                let minX: number = ball.positionX;
                let maxX: number = ball.positionX + 5;

                let minY: number = ball.positionY;
                let maxY: number = ball.positionY + 5;

                //Checking if the laserpoint is in the hitbox of the ufo or not
                if (this.positionX <= maxX && minX <= (this.positionX + this.sizeX) && this.positionY <= maxY && minY <= (this.positionY + this.sizeY)) {
                    let index: number = allUFOs.indexOf(this); 
                    allUFOs.splice(index, 1); 
                }

            }
        }
    }
}