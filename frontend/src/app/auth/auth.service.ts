import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from './auth-response';
import { LoginRequest } from './login-request';
import { RegisterRequest } from './register-request';
import { Role } from '../shared/models/role.enum';

interface JwtPayload {
  sub: string;
  role: Role;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private mockTokens: { [key: string]: string } = {
    'patient@test.com': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6IlBBVElFTlQifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    'doctor@test.com': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwicm9sZSI6IkRPQ1RPUiJ9.4pcPyMD09olPSyXnrXCjTwXyr4BsezdI1AVwmEMcJc0'
  };

  login(credentials: LoginRequest): Observable<AuthResponse> {
    if (credentials.password !== 'password') {
      return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
    }

    const token = this.mockTokens[credentials.email];
    if (!token) {
      return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
    }

    return of({ token }).pipe(
      delay(500),
      tap(response => {
        localStorage.setItem('token', response.token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    const mockToken = this.generateMockToken(request.role);
    return of({ token: mockToken }).pipe(
      delay(500),
      tap(response => {
        localStorage.setItem('token', response.token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  getUserRole(): Role | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private generateMockToken(role: Role): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ sub: Date.now().toString(), role }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
  }
}
