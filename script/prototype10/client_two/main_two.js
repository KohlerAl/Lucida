"use strict";
var prototype10_Two;
(function (prototype10_Two) {
    prototype10_Two.allPlanets = [];
    prototype10_Two.allUFOs = [];
    prototype10_Two.ufoLaserpoints = [];
    prototype10_Two.rocketLaserpoints = [];
    let lanes = ["right", "right", "left", "left", "middle"];
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        const motionManager = new DeviceMotionAndOrientationManager();
        const startScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start();
    }
})(prototype10_Two || (prototype10_Two = {}));
//# sourceMappingURL=main_two.js.map