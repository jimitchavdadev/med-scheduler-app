import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PatientService } from '../patient.service';
import { HttpErrorService } from '../../shared/http-error.service';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="profile-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Patient Profile</mat-card-title>
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
              <mat-label>Date of Birth</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="dateOfBirth" />
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error *ngIf="profileForm.get('dateOfBirth')?.hasError('required')">
                Date of birth is required
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
export class PatientProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private errorService: HttpErrorService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.patientService.getProfile().subscribe({
      next: (profile) => {
        if (profile) {
          this.profileForm.patchValue({
            firstName: profile.firstName,
            lastName: profile.lastName,
            dateOfBirth: new Date(profile.dateOfBirth)
          });
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
      const formValue = this.profileForm.value;
      const dateOfBirth = formValue.dateOfBirth instanceof Date
        ? formValue.dateOfBirth.toISOString().split('T')[0]
        : formValue.dateOfBirth;

      const profileData = {
        ...formValue,
        dateOfBirth
      };

      this.patientService.createOrUpdateProfile(profileData).subscribe({
        next: () => {
          this.loading = false;
          this.errorService.showSuccess('Profile saved successfully!');
        },
        error: (error) => {
          this.loading = false;
          this.errorService.showError('Failed to save profile');
        }
      });
    }
  }
}
