"use strict";
class StartScreen {
    constructor(id) {
        this.screenDiv = null;
        this.textDiv = null;
        this.managers = [];
        this.screenDiv = document.getElementById(id);
        this.startPlanet = document.querySelector(".startPlanet");
        this.textDiv = document.querySelector(".start");
    }
    setText(text) {
        this.textDiv.classList.remove("error");
        this.textDiv.innerHTML = text;
    }
    setError(text) {
        this.textDiv.classList.add("error");
        this.textDiv.innerHTML = text;
    }
    start() {
        return new Promise((resolve) => {
            this.screenDiv.style.display = "block";
            //this.setText("Tippe auf den Bildschirm, um das Spiel zu starten");
            this.startPlanet.addEventListener("click", () => {
                this.setText("checking for resources...");
                const promises = [];
                for (let manager of this.managers) {
                    const promise = manager.getCheck();
                    promises.push(promise);
                }
                Promise.all(promises)
                    .then(() => {
                    this.close();
                    resolve();
                })
                    .catch((error) => {
                    this.setError(error);
                    //reject(error); // dead end :-)
                });
            });
        });
    }
    addResourceManager(manager) {
        this.managers.push(manager);
    }
    close() {
        this.screenDiv.style.display = "none";
    }
}
//# sourceMappingURL=StartScreen.js.map