import { PlayerPointsService } from './player-points.service';
import { FireBaseService } from './fire-base.service';
import { State } from '../state';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(
    private contentService: ContentService,
    private fireBaseService: FireBaseService,
    private playerPointsService: PlayerPointsService
  ) {}

  private appState = new BehaviorSubject<State>({ state: 'start', index: -1 });

  currentState = this.appState.asObservable();

  getIndex() {
    return this.appState.getValue().index;
  }

  resetAppState() {
    this.appState.next({ state: 'start', index: -1 });
  }

  async changeState(newState: string) {
    let currentIndex = this.getIndex();
    if (newState === 'image') {
      currentIndex++;
    }
    if (currentIndex >= (await this.contentService.getContentSize())) {
      newState = 'score';
      this.fireBaseService.saveUserPoints(
        this.playerPointsService.getTotalPoints()
      );
      currentIndex = -1;
    }
    this.appState.next({ state: newState, index: currentIndex });
  }
}
