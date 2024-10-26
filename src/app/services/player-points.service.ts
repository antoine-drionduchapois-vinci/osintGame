import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerPointsService {
  private totalPoints = 0;


  addPoints(points: number) {
    this.totalPoints += points;
  }


  getTotalPoints(): number {
    return this.totalPoints;
  }

  
  resetPoints() {
    this.totalPoints = 0;
  }
}
