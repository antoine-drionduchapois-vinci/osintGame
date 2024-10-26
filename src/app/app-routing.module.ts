import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent }, // Default route
  { 
    path: 'game', 
    loadChildren: () => import('./game/game.module').then(m => m.GameModule), 
    canActivate: [authGuard] 
  },
  { 
    path: 'ranking', 
    loadChildren: () => import('./ranking/ranking.module').then(m => m.RankingModule), 
    canActivate: [authGuard] 
  },
  { 
    path: 'settings', 
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule), 
    canActivate: [authGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
