import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from './doctor';
import { environment } from '../../environments/environment';

// This request interface matches the backend's ProfileRequestDto for doctors
export interface DoctorProfileRequest {
    firstName: string;
    lastName: string;
    specialty: string;
    qualifications: string;
}

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    private apiUrl = `${environment.apiUrl}/doctors`;

    constructor(private http: HttpClient) {}

    getAllDoctors(specialty?: string): Observable<Doctor[]> {
        let params = new HttpParams();
        if (specialty) {
            params = params.append('specialty', specialty);
        }
        return this.http.get<Doctor[]>(this.apiUrl, { params });
    }

    updateProfile(profile: DoctorProfileRequest): Observable<Doctor> {
        return this.http.post<Doctor>(`${this.apiUrl}/profile`, profile);
    }

    getProfile(): Observable<Doctor> {
        return this.http.get<Doctor>(`${this.apiUrl}/profile`);
    }
}