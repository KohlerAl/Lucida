namespace prototype10_Two {
    export let canvasBarrel: HTMLCanvasElement;
    export let ctxBarrel: CanvasRenderingContext2D;

    export let canvasPoint: HTMLCanvasElement;
    export let ctxPoint: CanvasRenderingContext2D;

    export let canvasPlanet: HTMLCanvasElement;
    export let ctxPlanet: CanvasRenderingContext2D;

    export let canvasRocket: HTMLCanvasElement;
    export let ctxRocket: CanvasRenderingContext2D;

    export let width: number;
    export let height: number;

    export let allImg: HTMLImageElement[];
    export let allUFOImg: HTMLImageElement;

    export let allPlanets: Planet[] = [];
    export let allUFOs: UFO[] = [];
    export let ufoLaserpoints: Ball[] = [];
    export let rocketLaserpoints: Ball[] = [];

    export let rocket: Rocket; 

    let lanes: string[] = ["right", "right", "left", "left", "middle"]; 


    window.addEventListener("load", handleLoad); 

    function handleLoad(): void {
        const motionManager: DeviceMotionAndOrientationManager = new DeviceMotionAndOrientationManager();
        const startScreen: StartScreen = new StartScreen("start-screen");
        startScreen.addResourceManager(motionManager);
        startScreen.start(); 
    }
}