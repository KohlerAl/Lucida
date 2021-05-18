namespace prototype04 {
    export class Rocket extends CanvasObject {
        damgeStatus: number; 
        newPosition: Vector; 

        constructor(_x: number, _y: number, _image: HTMLImageElement) {
            super(_x, _y, _image); 
        }

        public draw(): void {
            //draw UFO
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