import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users, Login, Register } from '../models/users';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) {}

  login(data: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        const imagePath = res.user.userImage
          ? `http://localhost:5000${res.user.userImage}`
          : 'assets/profile.png'; // fallback

        // Save user info to localStorage
        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('role', res.user.role || 'User');
        localStorage.setItem('imageUrl', imagePath);
      })
    );
  }

  register(data: Register): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveUser(user: Users) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Users | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
