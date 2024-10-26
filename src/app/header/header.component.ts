import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  template: `
    <div class="header-container" *ngIf="user$ | async as user">
      <p-toolbar styleClass="header-toolbar">
        <div>
          <button
            pButton
            type="button"
            label="Rankings"
            icon="pi pi-list"
            class="p-button-text"
            (click)="rankings()"
          ></button>
          <button
            pButton
            type="button"
            label="Game"
            icon="pi pi-play"
            class="p-button-text"
            (click)="game()"
          ></button>
          <button
            pButton
            type="button"
            label="Settings"
            icon="pi pi-cog"
            class="p-button-text"
            (click)="settings()"
          ></button>
          <button
            pButton
            type="button"
            label="Logout"
            icon="pi pi-sign-out"
            class="p-button-text"
            (click)="onLogout()"
          ></button>
        </div>
      </p-toolbar>
    </div>
  `,
})
export class HeaderComponent implements OnInit{
  user$!: Observable<any | null>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private stateService: StateService
  ) {
   
  }

  ngOnInit(){
    this.user$ = this.authService.user$;
  }

  rankings() {
    this.router.navigate(['ranking']);
  }

  game() {
    this.router.navigate(['game']);
  }

  settings() {
    this.router.navigate(['settings']);
  }

  onLogout() {
    this.authService
      .signOut()
      .then(() => {
        alert('User signed out successfully');
        this.stateService.resetAppState();
        this.router.navigate(['']);
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
        alert('Sign-out failed: ' + error.message);
      });
  }
}
