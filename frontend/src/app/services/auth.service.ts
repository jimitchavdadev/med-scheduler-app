import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private readonly TOKEN_KEY = 'auth_token';
  constructor(private http: HttpClient, private router: Router) { }
  register(userInfo: any): Observable<AuthResponse> { return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userInfo).pipe(tap(res => this.setToken(res.token))); }
  login(credentials: any): Observable<AuthResponse> { return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(tap(res => this.setToken(res.token))); }
  logout(): void { localStorage.removeItem(this.TOKEN_KEY); this.router.navigate(['/login']); }
  private setToken(token: string): void { localStorage.setItem(this.TOKEN_KEY, token); }
  getToken(): string | null { return localStorage.getItem(this.TOKEN_KEY); }
  isLoggedIn(): boolean { return !!this.getToken(); }
}
