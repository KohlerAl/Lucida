namespace prototype04 {
    export class CanonBarrel extends CanvasObject { 
        angle: number; 

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

        public shoot(): void {
            //shoot Laserpoint
        }

        public setAngle(_angle: number): void {
            this.angle = _angle; 
        }
    }
}