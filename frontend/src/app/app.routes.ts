import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard';
import { DoctorListComponent } from './components/doctor-list/doctor-list';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctors', component: DoctorListComponent, canActivate: [authGuard] },
  { path: 'patient-dashboard', component: PatientDashboardComponent, canActivate: [authGuard] },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
