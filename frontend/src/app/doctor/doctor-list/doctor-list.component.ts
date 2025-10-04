import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../doctor';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  template: `
    <div class="doctor-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Available Doctors</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Filter by Specialty</mat-label>
            <input matInput [formControl]="filterControl" placeholder="Enter specialty" />
          </mat-form-field>

          <div class="table-container">
            <table mat-table [dataSource]="dataSource" matSort class="doctors-table">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                <td mat-cell *matCellDef="let doctor">
                  {{ doctor.firstName }} {{ doctor.lastName }}
                </td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
                <td mat-cell *matCellDef="let doctor">{{ doctor.email }}</td>
              </ng-container>

              <ng-container matColumnDef="specialty">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Specialty</th>
                <td mat-cell *matCellDef="let doctor">{{ doctor.specialty }}</td>
              </ng-container>

              <ng-container matColumnDef="qualifications">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Qualifications</th>
                <td mat-cell *matCellDef="let doctor">{{ doctor.qualifications }}</td>
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
    .doctor-list-container {
      padding: 24px;
    }

    .filter-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .table-container {
      overflow-x: auto;
    }

    .doctors-table {
      width: 100%;
    }

    @media (max-width: 768px) {
      .doctor-list-container {
        padding: 16px;
      }
    }
  `]
})
export class DoctorListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'specialty', 'qualifications'];
  dataSource = new MatTableDataSource<Doctor>([]);
  filterControl = new FormControl('');
  allDoctors: Doctor[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.setupFilter();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.allDoctors = doctors;
        this.dataSource.data = doctors;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  setupFilter(): void {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.applyFilter(value || '');
      });
  }

  applyFilter(filterValue: string): void {
    const filtered = this.allDoctors.filter(doctor =>
      doctor.specialty.toLowerCase().includes(filterValue.toLowerCase())
    );
    this.dataSource.data = filtered;
  }
}
