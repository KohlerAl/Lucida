namespace prototype05 {
    export class Planet {
        posX: number;
        posY: number;
        image: HTMLImageElement;
        size: number;

        constructor(_x: number, _y: number, _image: HTMLImageElement, _size?: number) {
            this.posX = _x;
            this.posY = _y;
            this.image = _image;
            console.log(this.image);
            if (_size) {
                this.size = _size;
            }
        }

        public move(_add: number): void {
            this.posY += _add;

            if (this.posY > height * 2) {
                let index: number = allPlanets.indexOf(this);
                allPlanets.splice(index, 1);
            }
        }

        public draw(_ctx: CanvasRenderingContext2D): void {
            if (this.size)
                _ctx.drawImage(this.image, this.posX, this.posY, this.size, this.size);
            else
                _ctx.drawImage(this.image, this.posX, this.posY);
        }
    }
}