"use strict";
var prototype04;
(function (prototype04) {
    class Galaxy {
        constructor(_type) {
            //planetSet: string[]; 
            this.imagesPlanet = [];
            this.planets = [];
            this.imagesUFO = [];
            this.ufos = [];
            this.type = _type;
            this.getImages();
            console.log(this.planets);
            console.log(this.type);
        }
        getImages() {
            switch (this.type) {
                case "red":
                    let allRed = document.querySelectorAll(".red");
                    for (let planetRed of allRed) {
                        this.imagesPlanet.push(planetRed);
                    }
                    break;
                case "blue":
                    let allBlue = document.querySelectorAll(".blue");
                    for (let planetBlue of allBlue) {
                        this.imagesPlanet.push(planetBlue);
                    }
                    break;
                case "green":
                    let allGreen = document.querySelectorAll(".green");
                    for (let planetGreen of allGreen) {
                        this.imagesPlanet.push(planetGreen);
                    }
                    break;
            }
        }
        createUFOs() {
            //randomly create new ufos
        }
        move() {
            // move the planets and ufos on the background canvas
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].move(2);
                this.planets[i].draw();
            }
        }
    }
    prototype04.Galaxy = Galaxy;
})(prototype04 || (prototype04 = {}));
//# sourceMappingURL=Galaxy.js.map