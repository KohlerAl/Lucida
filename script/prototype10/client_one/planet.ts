namespace prototype10_One {
    export class Planet {
        //Again, we define the attributes we need. We need a type for the planet so we know if it is a pink or a orange planet (the value is sent to the server to create the same 
        // one for the other client)
        posX: number;
        posY: number;
        image: HTMLImageElement;
        size: number;

        didDamage: boolean = false; 
        index: number; 
        type: string; 

        constructor(_x: number, _y: number, _image: HTMLImageElement, _size: number, _index: number, _type: string) {
            //Setting the attributes to the given values
            this.posX = _x;
            this.posY = _y;
            this.image = _image;
            this.size = _size;
            this.index = _index; 
            this.type = _type; 
        }

        public move(_add: number): void {
            //moving the planet and checking if it is still on the canvas. if not, it is removed from the array
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