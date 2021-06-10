namespace prototype10_One {
    export class Rocket {
        //Save the position. We need a position from which we can calculate the new position if the phone moves. 
        startPosX: number;
        startPosY: number;
        newPos: number;

        // The Rocket has three different stages, so we need three different images to paint on the canvas
        image: HTMLImageElement;
        imageDamageOne: HTMLImageElement;
        imageDamageTwo: HTMLImageElement;

        //The size we need to scale the rocket to a good size
        sizeX: number = 50;
        sizeY: number = 100;

        //The damage the rocket has taken. At the start of the game, it is 0.
        damageStatus: number = 0;

        constructor(_startPosX: number, _startPosY: number, _image: HTMLImageElement, _imageDamageOne: HTMLImageElement, _imageDamageTwo: HTMLImageElement) {
            //Setting variables to the given values
            this.startPosX = _startPosX;
            this.startPosY = _startPosY;
            this.image = _image;
            this.imageDamageOne = _imageDamageOne;
            this.imageDamageTwo = _imageDamageTwo;

            //At first, we copy the the start position, so the rocket will start to fly in the middle of the screen 
            this.newPos = this.startPosX;
        }

        public move(_add: number): void {
            //_add is the _event.gamma value of the DeviceOrientationEvent. We mulitply it by two so that the rocket has more room to move
            this.newPos = this.startPosX + (_add * 2);
        }

        public drawRocket(): void {
            //clearing the canvas
            ctxRocket.clearRect(0, 0, canvasRocket.width, canvasRocket.height + 150);
            
            //depending on the damage of the rocket, it is drawn with a different image
            if (this.damageStatus == 0) {
                ctxRocket.drawImage(this.image, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
            else if (this.damageStatus == 1) {
                ctxRocket.drawImage(this.imageDamageOne, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
            else if (this.damageStatus == 2) {
                ctxRocket.drawImage(this.imageDamageTwo, this.newPos, this.startPosY, this.sizeX, this.sizeY); 
            }
        }

        public damageUpdate(): void {
            //The damage status is increased, then the rocket is drawn 
            this.damageStatus++;
            this.drawRocket(); 

            //To make sure both players have the same damge value of the rocket it is sent to the server
            sendDamageUpdate(); 

            //In case the damge value is 3, all arrays are cleared and the page is reloaded -> game over
            if (this.damageStatus >= 3) {
                ufoLaserpoints = [];
                rocketLaserpoints = []; 
                allPlanets = []; 
                allUFOs = [];  
                gameover = true; 
                location.reload(); 
            }
        }

        checkCollision(): void {
            //checking the collision with the planets, ufos and the laserpoints 
            for (let planet of allPlanets) {
                //creating a hitbox around the planet (the position is the upper left corner of the box, so we need to add the size in x and y direction)
                let minX: number = planet.posX;
                let maxX: number = planet.posX + planet.size;

                let minY: number = planet.posY;
                let maxY: number = planet.posY + planet.size;

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
            for (let ufo of allUFOs) {
                let minX: number = ufo.positionX;
                let maxX: number = ufo.positionX + ufo.sizeX;

                let minY: number = ufo.positionY;
                let maxY: number = ufo.positionY + ufo.sizeY;

                if (ufo.didDamage == false) {
                    if (this.newPos <= maxX && minX <= (this.newPos + this.sizeX) && this.startPosY <= maxY && minY <= (this.startPosY + this.sizeY)) {
                        this.damageUpdate();
                        ufo.didDamage = true;

                        let index: number = allUFOs.indexOf(ufo); 
                        allUFOs.splice(index, 1); 
                    }
                }
            }

            for (let ball of ufoLaserpoints) {
                let minX: number = ball.positionX;
                let maxX: number = ball.positionX + 10;

                let minY: number = ball.positionY;
                let maxY: number = ball.positionY + 10;

                if (ball.didDamage == false) {
                    if (this.newPos <= maxX && minX <= (this.newPos + this.sizeX) && this.startPosY <= maxY && minY <= (this.startPosY + this.sizeY)) {
                        this.damageUpdate();
                        ball.didDamage = true;

                        let index: number = ufoLaserpoints.indexOf(ball); 
                        ufoLaserpoints.splice(index, 1); 
                    }
                }
            }
        }
    }
}