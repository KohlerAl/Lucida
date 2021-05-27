namespace prototype08 {
    export class UFO {
        positionX: number;
        positionY: number;

        sizeX: number;
        sizeY: number;

        damage: number = 0;
        image: HTMLImageElement;

        didDamage: boolean; 

        constructor(_x: number, _y: number, _sizeX: number, _sizeY: number, _image: HTMLImageElement) {
            this.positionX = _x;
            this.positionY = _y;

            this.sizeX = _sizeX;
            this.sizeY = _sizeY;

            this.image = _image;

            this.didDamage = false; 
        }

        shoot(): void {
            //Pew pew
            let ball: Ball = new Ball(this.positionX, this.positionY); 
            ball.getElevation(rocket.newPos, rocket.startPosY); 
            ufoLaserpoints.push(ball); 
        }

        draw(_ctx: CanvasRenderingContext2D): void {
            _ctx.drawImage(this.image, this.positionX, this.positionY, this.sizeX, this.sizeY);
        }

        move(_add: number): void {

            this.positionY += _add;

            if (this.positionY > height * 2) {
                let index: number = allUFOs.indexOf(this);
                allUFOs.splice(index, 1);
            }

        }
    }
}