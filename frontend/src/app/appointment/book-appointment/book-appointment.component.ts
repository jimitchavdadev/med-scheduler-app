import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppointmentService } from '../appointment.service';
import { DoctorService } from '../../doctor/doctor.service';
import { HttpErrorService } from '../../shared/http-error.service';
import { Doctor } from '../../doctor/doctor';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="appointment-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Book Appointment</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Select Doctor</mat-label>
              <mat-select formControlName="doctorId">
                <mat-option *ngFor="let doctor of doctors" [value]="doctor.id">
                  {{ doctor.firstName }} {{ doctor.lastName }} - {{ doctor.specialty }}
                </mat-option>
              </mat-select>
              <mat-error *ngIf="appointmentForm.get('doctorId')?.hasError('required')">
                Doctor is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Appointment Date</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="appointmentDate" [min]="minDate" />
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error *ngIf="appointmentForm.get('appointmentDate')?.hasError('required')">
                Date is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Time (HH:mm)</mat-label>
              <input matInput type="time" formControlName="appointmentTime" />
              <mat-error *ngIf="appointmentForm.get('appointmentTime')?.hasError('required')">
                Time is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Notes</mat-label>
              <textarea matInput rows="4" formControlName="notes"></textarea>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="appointmentForm.invalid || loading"
              class="submit-button">
              <span *ngIf="!loading">Book Appointment</span>
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .appointment-container {
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
      .appointment-container {
        padding: 16px;
      }
    }
  `]
})
export class BookAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  loading = false;
  doctors: Doctor[] = [];
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private errorService: HttpErrorService,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
      },
      error: (error) => {
        this.errorService.showError('Failed to load doctors');
      }
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.loading = true;
      const formValue = this.appointmentForm.value;

      const date = formValue.appointmentDate instanceof Date
        ? formValue.appointmentDate.toISOString().split('T')[0]
        : formValue.appointmentDate;

      const appointmentTime = `${date}T${formValue.appointmentTime}:00`;

      const appointmentRequest = {
        doctorId: formValue.doctorId,
        appointmentTime,
        notes: formValue.notes
      };

      this.appointmentService.bookAppointment(appointmentRequest).subscribe({
        next: () => {
          this.loading = false;
          this.errorService.showSuccess('Appointment booked successfully!');
          this.router.navigate(['/appointment/my']);
        },
        error: (error) => {
          this.loading = false;
          this.errorService.showError('Failed to book appointment');
        }
      });
    }
  }
}
