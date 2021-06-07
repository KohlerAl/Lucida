namespace prototype10_One {
    export class Barrel {
        positionX: number;
        positionY: number;
        rotation: number;
        image: HTMLImageElement;

        constructor(_x: number, _y: number, _rotaion: number, _image: HTMLImageElement) {
            this.positionX = _x;
            this.positionY = _y;
            this.rotation = _rotaion;
            this.image = _image;
        }

        move(_gamma: number): void {
            let rotation: number = 270 + _gamma;


            if (rotation < 225) {
                rotation = 225;
            }
            else if (rotation > 315) {
                rotation = 315;
            }
            this.rotation = rotation;
        }

        draw(): void {
            ctxBarrel.clearRect(0, 0, canvasBarrel.width, canvasBarrel.height + 150);
            ctxBarrel.save();
            ctxBarrel.translate(rocket.newPos +  20, rocket.startPosY + 50);
            ctxBarrel.beginPath();
            ctxBarrel.rotate(this.rotation * Math.PI / 180);
            ctxBarrel.strokeStyle = "#88888888";
            ctxBarrel.lineWidth = 2;
            ctxBarrel.fillStyle = "#88888888";
            ctxBarrel.rect(0, 0, 100, 10);
            ctxBarrel.stroke();
            ctxBarrel.fill();
            ctxBarrel.closePath();
            ctxBarrel.restore();
        }
    }
}