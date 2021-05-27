namespace prototype08 {
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
            ctxR.clearRect(0, 0, canvasRocket.width, canvasRocket.height + 150);
            if (this.damageStatus == 0) {
                ctxR.drawImage(this.image, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
            else if (this.damageStatus == 1) {
                ctxR.drawImage(this.imageDamageOne, this.newPos, this.startPosY, this.sizeX, this.sizeY);
            }
            else if (this.damageStatus == 2) {
                ctxR.drawImage(this.imageDamageTwo, this.newPos, this.startPosY, this.sizeX, this.sizeY); 
            }
        }

        public damageUpdate(): void {
            this.damageStatus++;
            this.drawRocket(); 

            if (this.damageStatus >= 3) {
                window.alert("The Rocket is irreparable damaged");
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
        }
    }
}