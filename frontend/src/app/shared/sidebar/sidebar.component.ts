import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../models/role.enum';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <mat-nav-list>
      <ng-container *ngIf="userRole === Role.PATIENT">
        <a mat-list-item routerLink="/patient/profile" routerLinkActive="active">
          <mat-icon matListItemIcon>person</mat-icon>
          <span matListItemTitle>Profile</span>
        </a>
        <a mat-list-item routerLink="/doctors" routerLinkActive="active">
          <mat-icon matListItemIcon>local_hospital</mat-icon>
          <span matListItemTitle>Doctors</span>
        </a>
        <a mat-list-item routerLink="/appointment/book" routerLinkActive="active">
          <mat-icon matListItemIcon>add_circle</mat-icon>
          <span matListItemTitle>Book Appointment</span>
        </a>
        <a mat-list-item routerLink="/appointment/my" routerLinkActive="active">
          <mat-icon matListItemIcon>event</mat-icon>
          <span matListItemTitle>My Appointments</span>
        </a>
      </ng-container>

      <ng-container *ngIf="userRole === Role.DOCTOR">
        <a mat-list-item routerLink="/doctor/profile" routerLinkActive="active">
          <mat-icon matListItemIcon>person</mat-icon>
          <span matListItemTitle>Profile</span>
        </a>
        <a mat-list-item routerLink="/appointment/my" routerLinkActive="active">
          <mat-icon matListItemIcon>event</mat-icon>
          <span matListItemTitle>My Appointments</span>
        </a>
      </ng-container>
    </mat-nav-list>
  `,
  styles: [`
    mat-nav-list {
      padding-top: 16px;
    }

    a {
      margin-bottom: 8px;
    }

    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }

    :host-context(.dark-theme) .active {
      background-color: rgba(255, 255, 255, 0.04);
    }
  `]
})
export class SidebarComponent implements OnInit {
  userRole: Role | null = null;
  Role = Role;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }
}
