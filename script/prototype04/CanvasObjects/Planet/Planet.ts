namespace prototype04 {
    export class Planet extends CanvasObject {

        constructor(_x: number, _y: number, _image: HTMLImageElement, _size?: Vector) {
            if (_size) {
                super(_x, _y, _image, _size);
            }
            else {
                super(_x, _y, _image);
            }
        }

        public draw(): void {
            if (this.size)
                ctxBackground.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
            else
                ctxBackground.drawImage(this.image, this.position.x, this.position.y);
        }

        public setSize(_x: number, _y: number): void {
            super.setSize(_x, _y);
        }

        public move(_add: number): void {
            this.position.y += _add;
        }
    }
}