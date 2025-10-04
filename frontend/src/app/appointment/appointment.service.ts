import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';
import { AppointmentRequest } from './appointment-request';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private apiUrl = `${environment.apiUrl}/appointments`;

    constructor(private http: HttpClient) {}

    bookAppointment(request: AppointmentRequest): Observable<Appointment> {
        return this.http.post<Appointment>(this.apiUrl, request);
    }

    getMyAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.apiUrl}/my-appointments`);
    }
}