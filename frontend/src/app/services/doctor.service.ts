import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = 'http://localhost:8080/api/doctors';
  constructor(private http: HttpClient) { }
  getAllDoctors(): Observable<Doctor[]> { return this.http.get<Doctor[]>(this.apiUrl); }
}
