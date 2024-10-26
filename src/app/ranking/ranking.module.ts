import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RankingComponent } from './ranking.component';
import { ListboxModule } from 'primeng/listbox'; // PrimeNG for better UI
import { CardModule } from 'primeng/card';

const routes: Routes = [
  { path: '', component: RankingComponent } // Default route for this module
];

@NgModule({
  declarations: [RankingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ListboxModule,
    CardModule
  ]
})
export class RankingModule {}
