class DeviceMotionAndOrientationManager implements ResourceManager {
  public onMotion: Function;
  public onAccelerationIncludingGravity: Function;
  public onAcceleration: Function;
  public onRotationRate: Function;
  public onOrientation: Function;

  private resolve: Function;
  private timeout: NodeJS.Timeout;
  private scaleAcc: number = 1; // scale factor to re-invert iOS acceleration

  constructor() {
    this.onDeviceMotion = this.onDeviceMotion.bind(this);
    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
  }

  getCheck(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.resolve = resolve;

      // set timeout in case that the API response, but no data is sent
      this.timeout = setTimeout(  ()  => {
          reject("no device motion/orientation data streams");
      },                          1000);

      if (DeviceMotionEvent || DeviceOrientationEvent) {
        // ask device motion/orientation permission on iOS
        if (DeviceMotionEvent.requestPermission || DeviceOrientationEvent.requestPermission) {
          DeviceMotionEvent.requestPermission()
            .then((response) => {
              if (response == "granted") {
                // got permission, hide start overrlay and listenm
                resolve();

                if (this.onMotion !== null ||
                  this.onAccelerationIncludingGravity !== null ||
                  this.onAcceleration !== null ||
                  this.onRotationRate !== null) {
                  window.addEventListener("devicemotion", this.onDeviceMotion);
                }

                // re-invert inverted iOS acceleration values
                this.scaleAcc = -1;
              } else {
                reject("no permission for device motion");
              }
            })
            .catch(console.error);

          DeviceOrientationEvent.requestPermission()
            .then((response) => {
              if (response == "granted") {
                if (this.onOrientation !== null) {
                  window.addEventListener("deviceorientation", this.onDeviceOrientation);
                }

                resolve();
              } else {
                reject("no permission for device orientation");
              }
            })
            .catch(console.error);
        } else {
          window.addEventListener("devicemotion", this.onDeviceMotion);
          window.addEventListener("deviceorientation", this.onDeviceOrientation);
        }
      } else {
        reject("device motion/orientation not available");
      }
    });
  }

  onDeviceMotion(evt: DeviceMotionEvent): void {
    if (this.timeout !== null) {
      this.resolve();
      clearTimeout(this.timeout);
    }

    if (this.onMotion !== null) {
      const accig: DeviceMotionEventAcceleration = <DeviceMotionEventAcceleration>evt.accelerationIncludingGravity;
      const acc: DeviceMotionEventAcceleration = <DeviceMotionEventAcceleration>evt.acceleration;
      const rot: DeviceMotionEventRotationRate = <DeviceMotionEventRotationRate>evt.rotationRate;

      this.onMotion(this.scaleAcc * <number>accig.x, this.scaleAcc * <number>accig.y, this.scaleAcc * <number>accig.z,
                    this.scaleAcc * <number>acc.x, this.scaleAcc * <number>acc.y, this.scaleAcc * <number>acc.z,
                    rot.alpha, rot.beta, rot.gamma,
                    evt.interval);
    }

    if (this.onAccelerationIncludingGravity !== null) {
      const accig: DeviceMotionEventAcceleration = <DeviceMotionEventAcceleration>evt.accelerationIncludingGravity;
      this.onAccelerationIncludingGravity(this.scaleAcc * <number>accig.x, this.scaleAcc * <number>accig.y, this.scaleAcc * <number>accig.z, evt.interval);
    }

    if (this.onAcceleration !== null) {
      const acc: DeviceMotionEventAcceleration = <DeviceMotionEventAcceleration>evt.acceleration;
      this.onAcceleration(this.scaleAcc * <number>acc.x, this.scaleAcc * <number>acc.y, this.scaleAcc * <number>acc.z, evt.interval);
    }

    if (this.onRotationRate !== null) {
      const rot: DeviceMotionEventRotationRate = <DeviceMotionEventRotationRate>evt.rotationRate;
      this.onRotationRate(rot.alpha, rot.beta, rot.gamma, evt.interval);
    }
  }

  onDeviceOrientation(evt: DeviceOrientationEvent): void {
    if (this.timeout !== null) {
      this.resolve();
      clearTimeout(this.timeout);
    }

    if (this.onOrientation !== null) {
      this.onOrientation(evt.alpha, evt.beta, evt.gamma);
    }
  }
}
