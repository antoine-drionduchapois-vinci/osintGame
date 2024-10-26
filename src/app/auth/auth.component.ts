import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.css'],
  template: `
    <div class="auth-container">
      <p-card header="Authentication" styleClass="auth-card">
        <div class="p-fluid">
          <div class="p-field">
            <label for="email">Email</label>
            <input id="email" type="text" pInputText [(ngModel)]="email" />
          </div>

          <div class="p-field">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              pInputText
              [(ngModel)]="password"
            />
          </div>

          <div class="button-container">
            <button
              pButton
              type="button"
              label="Register"
              icon="pi pi-user-plus"
              (click)="onRegister()"
              pRipple
            ></button>
            <button
              pButton
              type="button"
              label="Login"
              icon="pi pi-sign-in"
              (click)="onLogin()"
              pRipple
            ></button>
          </div>
        </div>
      </p-card>
    </div>
  `,
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService
      .register(this.email, this.password)
      .then((user) => {
        console.log('User registered successfully:', user);
        alert('User registered successfully');
        this.router.navigate(['game']);
      })
      .catch((error) => {
        console.error('Registration error:', error);
        alert('Registration failed: ' + error.message);
      });
  }

  onLogin() {
    this.authService
      .signin(this.email, this.password)
      .then((user) => {
        console.log('User signed in successfully:', user);
        alert('User signed in successfully');
        this.router.navigate(['game']);
      })
      .catch((error) => {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
      });
  }
}
