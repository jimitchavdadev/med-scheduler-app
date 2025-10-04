import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../auth/auth.service';
import { ThemeService } from '../theme.service';
import { Role } from '../models/role.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary" class="header">
      <button mat-icon-button (click)="toggleSidebar.emit()" *ngIf="isLoggedIn">
        <mat-icon>menu</mat-icon>
      </button>

      <span class="app-name" [routerLink]="isLoggedIn ? getHomeRoute() : '/auth/login'">
        MedScheduler
      </span>

      <span class="spacer"></span>

      <button mat-icon-button (click)="toggleTheme()">
        <mat-icon>brightness_4</mat-icon>
      </button>

      <button mat-button [matMenuTriggerFor]="menu" *ngIf="isLoggedIn">
        <mat-icon>account_circle</mat-icon>
        <span class="user-role">{{ userRole }}</span>
      </button>

      <mat-menu #menu="matMenu">
        <button mat-menu-item [routerLink]="getProfileRoute()">
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </button>
        <button mat-menu-item (click)="logout()">
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .app-name {
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      margin-left: 8px;
    }

    .spacer {
      flex: 1;
    }

    .user-role {
      margin-left: 8px;
      text-transform: capitalize;
    }

    @media (max-width: 768px) {
      .user-role {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  isLoggedIn = false;
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        const role = this.authService.getUserRole();
        this.userRole = role ? role.toLowerCase() : null;
      }
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getProfileRoute(): string {
    const role = this.authService.getUserRole();
    return role === Role.PATIENT ? '/patient/profile' : '/doctor/profile';
  }

  getHomeRoute(): string {
    const role = this.authService.getUserRole();
    return role === Role.PATIENT ? '/patient/profile' : '/doctor/profile';
  }
}
