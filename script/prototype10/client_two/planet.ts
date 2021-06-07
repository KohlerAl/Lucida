namespace prototype10_Two {
    export class Planet {
        posX: number;
        posY: number;
        image: HTMLImageElement;
        size: number;

        didDamage: boolean = false; 
        index: number; 

        constructor(_x: number, _y: number, _image: HTMLImageElement, _size: number, _index: number) {
            this.posX = _x;
            this.posY = _y;
            this.image = _image;
            this.size = _size;
            this.index = _index; 
        }

        public move(_add: number): void {
            this.posY += _add;

            if (this.posY > height * 2) {
                let index: number = allPlanets.indexOf(this);
                allPlanets.splice(index, 1);
            }
        }

        public draw(_ctx: CanvasRenderingContext2D): void {
            _ctx.drawImage(this.image, this.posX, this.posY, this.size, this.size);
        }
    }
}