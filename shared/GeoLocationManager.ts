class GeoLocationManager implements ResourceManager {
  public onLocation: Function;
  private timeout: NodeJS.Timeout;

  getCheck(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (navigator.geolocation) {

        // set timeout in case that the API response, but no data is sent
        this.timeout = setTimeout(() => {
          reject("no geolocation data");
        },                        7000);

        navigator.geolocation.getCurrentPosition( (position) => {
          if (this.timeout !== null) {
            resolve();
            clearTimeout(this.timeout);
          }
      
          if (this.onLocation !== null) {
            this.onLocation(position.coords, position.timestamp);

            navigator.geolocation.watchPosition((position) => {
              this.onLocation(position.coords, position.timestamp);
            });
          }
        },                                        () => {
                  reject("geolocation failed");
          });
      } else {
        reject("geolocation not available");
      }
    });
  }
}
