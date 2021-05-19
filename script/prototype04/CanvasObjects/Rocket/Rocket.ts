namespace prototype04 {
    export class Rocket extends CanvasObject {
        damageStatus: number;
        newPosition: Vector;
        imageStageTwo: HTMLImageElement;
        imageStageThree: HTMLImageElement;

        initalPos: Vector; 

        constructor(_x: number, _y: number, _image: HTMLImageElement, _imageStageTwo: HTMLImageElement, _imageStageThree: HTMLImageElement) {
            super(_x, _y, _image);
            this.imageStageTwo = _imageStageTwo;
            this.imageStageThree = _imageStageThree;
            this.damageStatus = 0;
            this.size = new Vector(50, 100);

            this.initalPos = this.position; 
        }

        public draw(): void {
            switch (this.damageStatus) {
                case (0):
                    ctxRocket.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
                    break;
                case (1):
                    ctxRocket.drawImage(this.imageStageTwo, this.position.x, this.position.y, this.size.x, this.size.y);
                    break;
                case (2):
                    ctxRocket.drawImage(this.imageStageThree, this.position.x, this.position.y, this.size.x, this.size.y);
                    break;
            }
        }

        public setSize(_x: number, _y: number): void {
            super.setSize(_x, _y);
        }

        public move(_add: number): void {
            let width: number = canvasRocket.width;
            if (this.position.x < 0) {
                this.position.x = 0;
            }
            else if (this.position.x > width - 50) {
                this.position.x = width - 50; 
            }
            /*if (this.position.x < width / 10 || this.position.x > (width * 0.9)) {
                this.position.x = this.position.x + _add;
            }
            else {
                this.position.x = this.position.x + _add * 1.5;
            } */
            this.position.x = this.initalPos.x + (_add * 2); 
        }

        public updateDamage(): void {
            //Check if damage is fatal or update damageStatus
        }

        public setNewPosition(_gamma: number): void {
            this.newPosition.x = this.position.x + (_gamma * 2);
            this.newPosition.y = this.position.y + (_gamma * 2);
        }
    }
}