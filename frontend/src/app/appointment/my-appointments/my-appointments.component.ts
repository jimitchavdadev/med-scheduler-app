import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../appointment';
import { AppointmentStatus } from '../../shared/models/appointment-status.enum';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../shared/models/role.enum';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="appointments-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>My Appointments</mat-card-title>
          <button mat-icon-button (click)="refresh()" class="refresh-button">
            <mat-icon>refresh</mat-icon>
          </button>
        </mat-card-header>
        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="dataSource" matSort class="appointments-table">
              <ng-container matColumnDef="patientName" *ngIf="userRole === Role.DOCTOR">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Patient Name</th>
                <td mat-cell *matCellDef="let appointment">{{ appointment.patientName }}</td>
              </ng-container>

              <ng-container matColumnDef="doctorName" *ngIf="userRole === Role.PATIENT">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Doctor Name</th>
                <td mat-cell *matCellDef="let appointment">{{ appointment.doctorName }}</td>
              </ng-container>

              <ng-container matColumnDef="appointmentTime">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Time</th>
                <td mat-cell *matCellDef="let appointment">
                  {{ formatDateTime(appointment.appointmentTime) }}
                </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                <td mat-cell *matCellDef="let appointment">
                  <mat-chip [ngClass]="getStatusClass(appointment.status)">
                    {{ appointment.status }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="notes">
                <th mat-header-cell *matHeaderCellDef>Notes</th>
                <td mat-cell *matCellDef="let appointment">{{ appointment.notes }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>

          <mat-paginator
            [pageSizeOptions]="[5, 10, 20]"
            showFirstLastButtons>
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .appointments-container {
      padding: 24px;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .refresh-button {
      margin-left: auto;
    }

    .table-container {
      overflow-x: auto;
      margin-top: 16px;
    }

    .appointments-table {
      width: 100%;
    }

    mat-chip {
      font-size: 12px;
    }

    .status-scheduled {
      background-color: #4caf50;
      color: white;
    }

    .status-completed {
      background-color: #2196f3;
      color: white;
    }

    .status-cancelled {
      background-color: #f44336;
      color: white;
    }

    @media (max-width: 768px) {
      .appointments-container {
        padding: 16px;
      }
    }
  `]
})
export class MyAppointmentsComponent implements OnInit {
  dataSource = new MatTableDataSource<Appointment>([]);
  displayedColumns: string[] = [];
  userRole: Role | null = null;
  Role = Role;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.setDisplayedColumns();
    this.loadAppointments();
  }

  setDisplayedColumns(): void {
    if (this.userRole === Role.PATIENT) {
      this.displayedColumns = ['doctorName', 'appointmentTime', 'status', 'notes'];
    } else {
      this.displayedColumns = ['patientName', 'appointmentTime', 'status', 'notes'];
    }
  }

  loadAppointments(): void {
    this.appointmentService.getMyAppointments().subscribe({
      next: (appointments) => {
        this.dataSource.data = appointments;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  refresh(): void {
    this.loadAppointments();
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.SCHEDULED:
        return 'status-scheduled';
      case AppointmentStatus.COMPLETED:
        return 'status-completed';
      case AppointmentStatus.CANCELLED:
        return 'status-cancelled';
      default:
        return '';
    }
  }
}
