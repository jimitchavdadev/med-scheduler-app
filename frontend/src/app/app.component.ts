import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthService } from './auth/auth.service';
import { ThemeService } from './shared/theme.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  template: `
    <div [class.dark-theme]="isDarkMode" class="app-container">
      <app-header (toggleSidebar)="sidenav.toggle()" *ngIf="showLayout"></app-header>

      <mat-sidenav-container class="sidenav-container" [class.auth-page]="!showLayout">
        <mat-sidenav
          #sidenav
          [mode]="isMobile ? 'over' : 'side'"
          [opened]="showLayout && !isMobile"
          *ngIf="showLayout">
          <app-sidebar></app-sidebar>
        </mat-sidenav>

        <mat-sidenav-content>
          <main class="main-content">
            <router-outlet></router-outlet>
          </main>
          <app-footer *ngIf="showLayout"></app-footer>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .sidenav-container {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .sidenav-container.auth-page {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    mat-sidenav {
      width: 250px;
      padding: 16px;
    }

    mat-sidenav-content {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
    }

    .dark-theme {
      background-color: #303030;
      color: white;
    }

    .dark-theme mat-sidenav {
      background-color: #424242;
    }

    .dark-theme mat-sidenav-content {
      background-color: #303030;
    }

    @media (max-width: 768px) {
      mat-sidenav {
        width: 200px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  showLayout = false;
  isMobile = false;
  isDarkMode = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.updateLayoutVisibility();
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateLayoutVisibility();
      });

    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      this.updateOverlayContainer(isDark);
    });
  }

  updateLayoutVisibility(): void {
    const isAuthRoute = this.router.url.includes('/auth');
    this.showLayout = this.authService.isLoggedIn() && !isAuthRoute;
  }

  checkMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }

  updateOverlayContainer(isDark: boolean): void {
    const overlayContainer = document.querySelector('.cdk-overlay-container');
    if (overlayContainer) {
      if (isDark) {
        overlayContainer.classList.add('dark-theme');
      } else {
        overlayContainer.classList.remove('dark-theme');
      }
    }
  }
}
