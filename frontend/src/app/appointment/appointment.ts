import { AppointmentStatus } from '../shared/models/appointment-status.enum';

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  appointmentTime: string;
  status: AppointmentStatus;
  notes: string;
}
