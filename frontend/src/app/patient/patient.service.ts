import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileRequest } from './profile-request';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private apiUrl = `${environment.apiUrl}/patients`;

    constructor(private http: HttpClient) {}

    createOrUpdateProfile(profile: ProfileRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/profile`, profile);
    }

    getProfile(): Observable<ProfileRequest> {
        return this.http.get<ProfileRequest>(`${this.apiUrl}/profile`);
    }
}