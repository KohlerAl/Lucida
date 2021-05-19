namespace prototype04 {
    export class Rocket extends CanvasObject {
        damgeStatus: number;
        newPosition: Vector;
        imageStageTwo: HTMLImageElement;
        imageStageThree: HTMLImageElement;

        constructor(_x: number, _y: number, _image: HTMLImageElement, _imageStageTwo: HTMLImageElement, _imageStageThree: HTMLImageElement) {
            super(_x, _y, _image);
            this.imageStageTwo = _imageStageTwo;
            this.imageStageThree = _imageStageThree;
        }

        public draw(): void {
            switch (this.damgeStatus) {
                case (0):
                    ctxRocket.drawImage(this.image, this.position.x, this.position.y);
                    break;
                case (1):
                    ctxRocket.drawImage(this.imageStageTwo, this.position.x, this.position.y);
                    break;
                case (2): 
                    ctxRocket.drawImage(this.imageStageThree, this.position.x, this.position.y);
                    break; 
            }
        }

        public setSize(_x: number, _y: number): void {
            super.setSize(_x, _y);
        }

        public move(_add: number): void {
            super.move(_add);
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