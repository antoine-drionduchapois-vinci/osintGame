import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  constructor() {}

  calculatePoints(distance: number): number {
    let points = 0;

    if (distance === 0) {
      points = 15;
    } else if (distance > 0 && distance <= 50) {
      points = Math.ceil(15 - (distance / 50) * 14);
    }
    return points;
  }
}
