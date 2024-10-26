import { Component } from '@angular/core';
import { StateService } from '../services/state.service';
import { State } from '../state';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-game',
  styleUrls: ['./game.component.css'],
  template: `
    <div *ngIf="currentState.state === 'start'" class="game-container">
      <p-card header="Play Game" styleClass="game-card">
        <p>Welcome to the game! Click below to start.</p>
        <button
          pButton
          type="button"
          label="Submit"
          icon="pi pi-play"
          (click)="changeState()"
          pRipple
        ></button>
      </p-card>
    </div>

    <div *ngIf="currentState.state === 'image'" class="game-container">
      <app-image-management></app-image-management>
    </div>

    <div *ngIf="currentState.state === 'map'" class="game-container">
      <app-map></app-map>
    </div>

    <div *ngIf="currentState.state === 'score'" class="game-container">
      <app-score></app-score>
    </div>
  `,
})
export class GameComponent {
  currentState: State = { state: 'image', index: 0 };

  constructor(
    private state: StateService,
  ) {
    this.state.currentState.subscribe((state) => {
      this.currentState = state;
    });
  }

  async changeState() {
    this.state.changeState('image');
  }
}
