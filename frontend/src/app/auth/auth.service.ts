import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from './auth-response';
import { LoginRequest } from './login-request';
import { RegisterRequest } from './register-request';
import { Role } from '../shared/models/role.enum';
import { environment } from '../../environments/environment';

interface JwtPayload {
    sub: string;
    role: Role;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    constructor(private http: HttpClient) {}

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                this.isLoggedInSubject.next(true);
            }),
            catchError(error => {
                const errorMessage = error.error?.message || 'Invalid credentials';
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    register(request: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                this.isLoggedInSubject.next(true);
            }),
            catchError(error => {
                const errorMessage = error.error?.message || 'Registration failed';
                return throwError(() => new Error(errorMessage));
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
}