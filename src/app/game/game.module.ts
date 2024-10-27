import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { ButtonModule } from 'primeng/button'; // PrimeNG for better UI
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';
import { ImageManagementComponent } from '../image-management/image-management.component';
import { ScoreComponent } from '../score/score.component';
import { MapComponent } from '../map/map.component';

const routes: Routes = [
  { path: '', component: GameComponent } // Default route for this module
];

@NgModule({
  declarations: [GameComponent, ImageManagementComponent, ScoreComponent, MapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule, // Import PrimeNG components as needed
    PinchZoomModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    RippleModule,
    FloatLabelModule,
    ToolbarModule,
    AvatarModule,
    PanelModule,
    ListboxModule,
    SidebarModule,
    MenuModule,
    FormsModule,
    CardModule,
    GoogleMapsModule
  ]
})
export class GameModule {}
