namespace prototype04 {
    export class Galaxy {
        public type: string;
        //planetSet: string[]; 
        public imagesPlanet: HTMLImageElement[] = [];
        public planets: Planet[] = [];

        public imagesUFO: HTMLImageElement[] = [];
        public ufos: UFO[] = [];

        constructor(_type: string) {
            this.type = _type;
            this.getImages();

            console.log(this.planets); 
            console.log(this.type); 
        }

        public getImages(): void {
            switch (this.type) {
                case "red":
                    let allRed: NodeListOf<HTMLImageElement> = document.querySelectorAll(".red");
                    for (let planetRed of allRed) {
                        this.imagesPlanet.push(planetRed);
                    }
                    break;
                case "blue":
                    let allBlue: NodeListOf<HTMLImageElement> = document.querySelectorAll(".blue");
                    for (let planetBlue of allBlue) {
                        this.imagesPlanet.push(planetBlue);
                    }
                    break;
                case "green":
                    let allGreen: NodeListOf<HTMLImageElement> = document.querySelectorAll(".green");
                    for (let planetGreen of allGreen) {
                        this.imagesPlanet.push(planetGreen);
                    }
                    break;
            }
            
        }

        public createUFOs(): void {
            //randomly create new ufos
        }

        public move(): void {
            // move the planets and ufos on the background canvas
            for (let i: number = 0; i < this.planets.length; i++) {
                this.planets[i].move(2); 
                this.planets[i].draw(); 
            }
        }
    }
}