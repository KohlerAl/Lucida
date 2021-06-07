namespace prototype10_Two {
    export class UFO {
        positionX: number;
        positionY: number;

        sizeX: number;
        sizeY: number;

        damage: number = 0;
        image: HTMLImageElement;

        didDamage: boolean;
        index: number;

        constructor(_x: number, _y: number, _sizeX: number, _sizeY: number, _image: HTMLImageElement, _index: number) {
            this.positionX = _x;
            this.positionY = _y;

            this.sizeX = _sizeX;
            this.sizeY = _sizeY;

            this.image = _image;

            this.didDamage = false;
            this.index = _index;
        }

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

        move(_add: number): void {

            this.positionY += _add;

            if (this.positionY > height * 2) {
                let index: number = allUFOs.indexOf(this);
                allUFOs.splice(index, 1);
            }

        }

        checkCollision(): void {
            for (let ball of rocketLaserpoints) {
                let minX: number = ball.positionX;
                let maxX: number = ball.positionX + 5;

                let minY: number = ball.positionY;
                let maxY: number = ball.positionY + 5;

                if (this.positionX <= maxX && minX <= (this.positionX + this.sizeX) && this.positionY <= maxY && minY <= (this.positionY + this.sizeY)) {
                    let index: number = allUFOs.indexOf(this); 
                    allUFOs.splice(index, 1); 
                }

            }
        }
    }
}