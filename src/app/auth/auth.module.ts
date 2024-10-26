import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // For ngModel two-way binding

// PrimeNG Components
import { InputTextModule } from 'primeng/inputtext'; // For pInputText directive
import { ButtonModule } from 'primeng/button'; // For pButton directive
 // For p-card component
import { RippleModule } from 'primeng/ripple'; // For pRipple directive

import { AuthComponent } from './auth.component';
import { CardModule } from 'primeng/card';

// Define the routes for the AuthModule
const routes: Routes = [
  { path: '', component: AuthComponent } // Route for the auth component
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Lazy-loaded routing for the auth module
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    RippleModule,
  ]
})
export class AuthModule {}
