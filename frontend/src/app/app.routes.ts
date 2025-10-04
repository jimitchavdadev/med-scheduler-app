import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Role } from './shared/models/role.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: 'patient',
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        canActivate: [roleGuard],
        data: { roles: [Role.PATIENT] },
        loadComponent: () => import('./patient/profile/patient-profile.component').then(m => m.PatientProfileComponent)
      }
    ]
  },
  {
    path: 'doctors',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.PATIENT] },
    loadComponent: () => import('./doctor/doctor-list/doctor-list.component').then(m => m.DoctorListComponent)
  },
  {
    path: 'doctor',
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        canActivate: [roleGuard],
        data: { roles: [Role.DOCTOR] },
        loadComponent: () => import('./doctor/profile/doctor-profile.component').then(m => m.DoctorProfileComponent)
      }
    ]
  },
  {
    path: 'appointment',
    canActivate: [authGuard],
    children: [
      {
        path: 'book',
        canActivate: [roleGuard],
        data: { roles: [Role.PATIENT] },
        loadComponent: () => import('./appointment/book-appointment/book-appointment.component').then(m => m.BookAppointmentComponent)
      },
      {
        path: 'my',
        loadComponent: () => import('./appointment/my-appointments/my-appointments.component').then(m => m.MyAppointmentsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
