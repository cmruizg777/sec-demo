import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() { }
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
    })
  }
}
