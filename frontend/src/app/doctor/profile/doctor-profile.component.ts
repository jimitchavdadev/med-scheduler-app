import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DoctorService } from '../doctor.service';
import { HttpErrorService } from '../../shared/http-error.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="profile-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Doctor Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>First Name</mat-label>
              <input matInput formControlName="firstName" />
              <mat-error *ngIf="profileForm.get('firstName')?.hasError('required')">
                First name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Last Name</mat-label>
              <input matInput formControlName="lastName" />
              <mat-error *ngIf="profileForm.get('lastName')?.hasError('required')">
                Last name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Specialty</mat-label>
              <input matInput formControlName="specialty" />
              <mat-error *ngIf="profileForm.get('specialty')?.hasError('required')">
                Specialty is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Qualifications</mat-label>
              <input matInput formControlName="qualifications" />
              <mat-error *ngIf="profileForm.get('qualifications')?.hasError('required')">
                Qualifications are required
              </mat-error>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="profileForm.invalid || loading"
              class="submit-button">
              <span *ngIf="!loading">Save Profile</span>
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 20px;
    }

    mat-form-field {
      width: 100%;
    }

    .submit-button {
      height: 48px;
    }

    @media (max-width: 768px) {
      .profile-container {
        padding: 16px;
      }
    }
  `]
})
export class DoctorProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private errorService: HttpErrorService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      specialty: ['', Validators.required],
      qualifications: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.doctorService.getProfile().subscribe({
      next: (profile) => {
        if (profile) {
          this.profileForm.patchValue(profile);
        }
      },
      error: (error) => {
        this.errorService.showError('Failed to load profile');
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      this.doctorService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.errorService.showSuccess('Profile updated successfully!');
        },
        error: (error) => {
          this.loading = false;
          this.errorService.showError('Failed to update profile');
        }
      });
    }
  }
}
