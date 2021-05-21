namespace prototype07 {
    export class Rocket {
        startPosX: number;
        startPosY: number;
        newPos: number;

        image: HTMLImageElement;
        sizeX: number = 50;
        sizeY: number = 100;

        damageStatus: number = 0;

        constructor(_startPosX: number, _startPosY: number, _image: HTMLImageElement) {
            this.startPosX = _startPosX;
            this.startPosY = _startPosY;
            this.image = _image;

            this.newPos = this.startPosX;
        }

        public move(_add: number): void {
            this.newPos = this.startPosX + (_add * 2);
        }

        public drawRocket(): void {
            ctxR.clearRect(0, 0, canvasRocket.width, canvasRocket.height + 150);
            ctxR.drawImage(this.image, this.newPos, this.startPosY, this.sizeX, this.sizeY);
        }

        public damageUpdate(): void {
            this.damageStatus++;

            if (this.damageStatus <= 3) {
                window.alert("The Rocket is irreparable damaged");
            }
        }

        checkCollision(): void {
            for (let planet of allPlanets) {
                let minX: number = planet.posX;
                let maxX: number = planet.posX + planet.size;

                let minY: number = planet.posY;
                let maxY: number = planet.posY + planet.size;

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
                        planet.didDamage = true;
                    }
                }
            }
        }
    }
}