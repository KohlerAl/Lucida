namespace prototype10_Two {
    export class Rocket {
        startPosX: number;
        startPosY: number;
        newPos: number;

        image: HTMLImageElement;
        imageDamageOne: HTMLImageElement;
        imageDamageTwo: HTMLImageElement;

        sizeX: number = 50;
        sizeY: number = 100;

        damageStatus: number = 0;

        constructor(_startPosX: number, _startPosY: number, _image: HTMLImageElement, _imageDamageOne: HTMLImageElement, _imageDamageTwo: HTMLImageElement) {
            this.startPosX = _startPosX;
            this.startPosY = _startPosY;
            this.image = _image;
            this.imageDamageOne = _imageDamageOne;
            this.imageDamageTwo = _imageDamageTwo;

            this.newPos = this.startPosX;
        }

        public move(_add: number): void {
            this.newPos = this.startPosX + (_add * 2);
        }

        public drawRocket(): void {
            ctxRocket.clearRect(0, 0, canvasRocket.width, canvasRocket.height + 150);
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
            this.damageStatus++;
            this.drawRocket(); 

            if (this.damageStatus >= 3) {
                //
            }
        }

        checkCollision(): void {
            for (let planet of allPlanets) {
                let minX: number = planet.posX;
                let maxX: number = planet.posX + planet.size;

                let minY: number = planet.posY;
                let maxY: number = planet.posY + planet.size;

                if (planet.didDamage == false) {
                    if (this.newPos <= maxX && minX <= (this.newPos + this.sizeX) && this.startPosY <= maxY && minY <= (this.startPosY + this.sizeY)) {
                        this.damageUpdate();
                        planet.didDamage = true;
                    }
                }
            }

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