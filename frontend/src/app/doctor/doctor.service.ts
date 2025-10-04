import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private mockDoctors: Doctor[] = [
    {
      id: 1,
      email: 'doctor1@test.com',
      firstName: 'Alice',
      lastName: 'Smith',
      specialty: 'Cardiology',
      qualifications: 'MD, PhD'
    },
    {
      id: 2,
      email: 'doctor2@test.com',
      firstName: 'Bob',
      lastName: 'Jones',
      specialty: 'Neurology',
      qualifications: 'MD'
    },
    {
      id: 3,
      email: 'doctor3@test.com',
      firstName: 'Carol',
      lastName: 'Williams',
      specialty: 'Pediatrics',
      qualifications: 'MD, FAAP'
    },
    {
      id: 4,
      email: 'doctor4@test.com',
      firstName: 'David',
      lastName: 'Brown',
      specialty: 'Orthopedics',
      qualifications: 'MD, MS'
    }
  ];

  private mockDoctorProfile = {
    firstName: 'Alice',
    lastName: 'Smith',
    specialty: 'Cardiology',
    qualifications: 'MD, PhD'
  };

  getAllDoctors(): Observable<Doctor[]> {
    return of(this.mockDoctors).pipe(delay(500));
  }

  updateProfile(profile: any): Observable<{ message: string }> {
    this.mockDoctorProfile = profile;
    return of({ message: 'Profile updated successfully' }).pipe(delay(500));
  }

  getProfile(): Observable<any> {
    return of(this.mockDoctorProfile).pipe(delay(500));
  }
}
