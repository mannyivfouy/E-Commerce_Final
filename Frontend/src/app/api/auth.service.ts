import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users, Login, Register } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) {}

  login(data: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: Register): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // setUser(user: Users) {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  // getUser(): Users | null {
  //   const data = localStorage.getItem('user');
  //   return data ? JSON.parse(data) : null;
  // }

  logout() {
    localStorage.removeItem('user');
  }
}
