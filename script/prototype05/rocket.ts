namespace prototype05 {
    export class Rocket {
        startPosX: number; 
        startPosY: number; 
        newPos: number; 

        image: HTMLImageElement; 
        sizeX: number = 50; 
        sizeY: number = 100; 

        constructor (_startPosX: number, _startPosY: number, _image: HTMLImageElement) {
            this.startPosX = _startPosX; 
            this.startPosY = _startPosY; 
            console.log(_startPosX, _startPosY); 
            this.image = _image; 

            this.newPos = this.startPosX; 
        }

        public move(_add: number): void {
            this.newPos = _add; 
            box.innerHTML += "NewPos: " + this.newPos + "  startPos: " + this.startPosX + " _add: " + _add;  
        }

        public drawRocket(): void {
            ctxR.clearRect(0, 0, canvasRocket.width, canvasRocket.height + 150);
            ctxR.drawImage(this.image, this.newPos, this.startPosY, 50, 100);
        }
    }
}