namespace prototype10_Two {
    export class Planet {
        posX: number;
        posY: number;
        image: HTMLImageElement;
        size: number;

        didDamage: boolean = false; 
        index: number; 
        type: string; 

        constructor(_x: number, _y: number, _image: HTMLImageElement, _size: number, _index: number, _type: string) {
            this.posX = _x;
            this.posY = _y;
            this.image = _image;
            this.size = _size;
            this.index = _index; 
            this.type = _type; 
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