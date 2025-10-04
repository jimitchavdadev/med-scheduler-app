import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Appointment } from './appointment';
import { AppointmentRequest } from './appointment-request';
import { AppointmentStatus } from '../shared/models/appointment-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private mockAppointments: Appointment[] = [
    {
      id: 1,
      patientId: 1,
      patientName: 'John Doe',
      doctorId: 1,
      doctorName: 'Alice Smith',
      appointmentTime: '2025-10-05T10:00:00',
      status: AppointmentStatus.SCHEDULED,
      notes: 'Checkup'
    },
    {
      id: 2,
      patientId: 1,
      patientName: 'John Doe',
      doctorId: 2,
      doctorName: 'Bob Jones',
      appointmentTime: '2025-10-06T14:00:00',
      status: AppointmentStatus.SCHEDULED,
      notes: 'Follow-up'
    },
    {
      id: 3,
      patientId: 1,
      patientName: 'John Doe',
      doctorId: 1,
      doctorName: 'Alice Smith',
      appointmentTime: '2025-09-20T09:00:00',
      status: AppointmentStatus.COMPLETED,
      notes: 'Annual physical'
    }
  ];

  private nextId = 4;

  bookAppointment(request: AppointmentRequest): Observable<Appointment> {
    const newAppointment: Appointment = {
      id: this.nextId++,
      patientId: 1,
      patientName: 'John Doe',
      doctorId: request.doctorId,
      doctorName: this.getDoctorName(request.doctorId),
      appointmentTime: request.appointmentTime,
      status: AppointmentStatus.SCHEDULED,
      notes: request.notes
    };

    this.mockAppointments.push(newAppointment);
    return of(newAppointment).pipe(delay(500));
  }

  getMyAppointments(): Observable<Appointment[]> {
    return of(this.mockAppointments).pipe(delay(500));
  }

  private getDoctorName(doctorId: number): string {
    const names: { [key: number]: string } = {
      1: 'Alice Smith',
      2: 'Bob Jones',
      3: 'Carol Williams',
      4: 'David Brown'
    };
    return names[doctorId] || 'Unknown Doctor';
  }
}
