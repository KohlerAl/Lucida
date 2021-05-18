namespace prototype04 {
    export class Vector {
        x: number; 
        y: number;
        
        constructor (_x: number, _y: number) {
            this.x = _x; 
            this.y = _y; 
        }

        public add (_x: number, _y: number): void {
            this.x += _x; 
            this.y += _y; 
        }

        public scale (_factor: number): void {
            this.x *= _factor; 
            this.y *= _factor; 
        }
    }
}