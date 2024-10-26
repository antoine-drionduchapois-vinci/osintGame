import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  private latitude: number = 0;
  private longitude: number = 0;

  setCoordinates(lat: number, lon: number) {
    this.latitude = lat;
    this.longitude = lon;
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }


}
