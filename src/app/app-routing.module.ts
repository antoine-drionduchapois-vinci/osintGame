import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { GameComponent } from './game/game.component';
import { RankingComponent } from './ranking/ranking.component';
import { authGuard } from './guard/auth.guard';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: AuthComponent }, // Default route
  { path: 'game', component: GameComponent, canActivate: [authGuard] },
  { path: 'ranking', component: RankingComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
