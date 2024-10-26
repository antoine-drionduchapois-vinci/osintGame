import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageManagementComponent } from './image-management/image-management.component';
import { GameComponent } from './game/game.component';
import { MapComponent } from './map/map.component';
import { ScoreComponent } from './score/score.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthComponent } from './auth/auth.component';
import { RankingComponent } from './ranking/ranking.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Prime
// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox'; // Import for p-listbox
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    AppComponent,
    ImageManagementComponent,
    GameComponent,
    MapComponent,
    ScoreComponent,
    AuthComponent,
    RankingComponent,
    HeaderComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    PinchZoomModule,
    BrowserAnimationsModule,
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
    MenuModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
