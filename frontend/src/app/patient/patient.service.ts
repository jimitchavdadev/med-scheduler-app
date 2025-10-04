import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProfileRequest } from './profile-request';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private mockProfiles: { [key: string]: ProfileRequest } = {
    'patient@test.com': {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01'
    }
  };

  createOrUpdateProfile(profile: ProfileRequest): Observable<{ message: string }> {
    this.mockProfiles['current'] = profile;
    return of({ message: 'Profile saved successfully' }).pipe(delay(500));
  }

  getProfile(): Observable<ProfileRequest | null> {
    const profile = this.mockProfiles['current'] || this.mockProfiles['patient@test.com'];
    return of(profile).pipe(delay(500));
  }
}
