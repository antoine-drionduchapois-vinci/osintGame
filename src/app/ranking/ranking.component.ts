import { Component, OnInit } from '@angular/core';
import { FireBaseService } from '../services/fire-base.service';

@Component({
  selector: 'app-ranking',
  styleUrls: ['./ranking.component.css'],
  template: `
  <div class="component-wrapper">
 <p-card styleClass="ranking-card">
    <ng-template pTemplate="header">
      <div class="header-content">
        <span>Ranking Board</span>
      </div>
    </ng-template>

    <ng-template pTemplate="content">
      <div class="ranking-content">
        <p-listbox [options]="ranking" optionLabel="display" [style]="{ width: '100%' }">
          <ng-template let-item pTemplate="item">
            <div class="ranking-item">
              <div class="ranking-email"><strong>Email:</strong> {{ item.email }}</div>

              <div class="ranking-points"><strong>Points:</strong> {{ item.points }}</div>
            </div>
          </ng-template>
        </p-listbox>
      </div>
    </ng-template>
  </p-card>
  </div>
`,
})
export class RankingComponent implements OnInit {
  ranking: any[] = [];

  constructor(private fireBaseService: FireBaseService) {}

  async ngOnInit() {
    await this.getRanking();
  }

  async getRanking() {
    this.ranking = await this.fireBaseService.getRanking();
  }
}
