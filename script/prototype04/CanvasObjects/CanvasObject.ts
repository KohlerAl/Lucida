namespace prototype04 {
    export abstract class CanvasObject {
        position: Vector;
        image: HTMLImageElement;
        size: Vector;

        constructor(_x: number, _y: number, _image: HTMLImageElement, _size?: Vector) {
            this.position = new Vector(_x, _y);
            this.image = _image;

            if (_size) {
                this.size = _size; 
            }
        }

        abstract draw(): void;

        public setSize(_x: number, _y: number): void {
            this.size = new Vector(_x, _y);
        }

        public move(_add: number): void {
            this.position.x += _add;
            this.position.y += _add;
        }
    }
}