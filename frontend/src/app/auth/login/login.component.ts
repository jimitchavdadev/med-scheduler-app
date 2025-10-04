import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../auth.service';
import { HttpErrorService } from '../../shared/http-error.service';
import { Role } from '../../shared/models/role.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Login to MedScheduler</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" />
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" />
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="loginForm.invalid || loading"
              class="submit-button">
              <span *ngIf="!loading">Login</span>
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
            </button>

            <div class="register-link">
              <p>Don't have an account? <a routerLink="/auth/register">Register here</a></p>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    mat-card {
      max-width: 400px;
      width: 100%;
    }

    mat-card-header {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    mat-form-field {
      width: 100%;
    }

    .submit-button {
      width: 100%;
      height: 48px;
    }

    .register-link {
      text-align: center;
      margin-top: 16px;
    }

    .register-link a {
      color: #1976d2;
      text-decoration: none;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private errorService: HttpErrorService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          const role = this.authService.getUserRole();
          if (role === Role.PATIENT) {
            this.router.navigate(['/patient/profile']);
          } else if (role === Role.DOCTOR) {
            this.router.navigate(['/doctor/profile']);
          }
          this.errorService.showSuccess('Login successful!');
        },
        error: (error) => {
          this.loading = false;
          this.errorService.showError(error.message || 'Login failed');
        }
      });
    }
  }
}
