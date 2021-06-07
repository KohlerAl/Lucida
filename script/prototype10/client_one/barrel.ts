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
            ctxBarrel.translate(this.positionX - 5, this.positionY - 50);
            ctxBarrel.rotate(this.rotation * Math.PI / 180);
            ctxBarrel.drawImage(this.image, this.positionX, this.positionY, 5, 50); 
            ctxBarrel.restore();
        }
    }
}