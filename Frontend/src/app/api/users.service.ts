import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:5000/api/users';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<{ users: Users[] }> {
    return this.http.get<{ users: Users[] }>(this.apiUrl);
  }

  deleteUserById(id: string) {
    return this.http.delete(`${this.apiUrl}/${encodeURIComponent(id)}`);
  }

  createUser(payload: any) {
    return this.http.post(`${this.apiUrl}`, payload);
  }

  updateUserById(id: string, payload: any) {
    return this.http.put(`${this.apiUrl}/${encodeURIComponent(id)}`, payload);
  }
}
