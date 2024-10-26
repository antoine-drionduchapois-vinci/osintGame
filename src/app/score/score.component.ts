import { PlayerPointsService } from '../services/player-points.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-score',
  //templateUrl: './score.component.html',
  styleUrl: './score.component.css',
  template: `
    <p-card styleClass="score-card">
      <ng-template pTemplate="header">
        <div class="header-content">
          <span>Player Score</span>
        </div>
      </ng-template>

      <ng-template pTemplate="content">
        <div class="score-content">
  
            <div class="score-details">
              <p><strong>Total Points:</strong> {{ getPlayerPoints() }}</p>
              <p *ngIf="user$"><strong>Player:</strong> {{ user$ }}</p>
            </div>

        </div>
      </ng-template>

      <ng-template pTemplate="footer">
        <div class="footer-content">
          <button
            pButton
            type="button"
            label="Replay"
            icon="pi pi-refresh"
            class="p-button-raised p-button-success"
            (click)="changeState()"
          ></button>
        </div>
      </ng-template>
    </p-card>
  `,
})
export class ScoreComponent implements OnInit{
  user$: any;

  constructor(
    private state: StateService,
    private playerPointsService: PlayerPointsService,
    private authService: AuthService
  ) {}

  changeState() {
    this.playerPointsService.resetPoints();
    this.state.changeState('start');
  }

  async ngOnInit() {
    this.user$ = await this.authService.getCurrentUserEmail();
    console.log(this.user$);
  }

  getPlayerPoints() {
    return this.playerPointsService.getTotalPoints();
  }
}
