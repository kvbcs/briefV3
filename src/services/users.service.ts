import { Injectable } from '@angular/core';
import { Users } from '../model/types';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  mockUsers: Users[] = [
    {
      id: 1,
      firstname: 'Alice',
      lastname: 'Johnson',
      email: 'alice.johnson@email.com',
    },
    {
      id: 2,
      firstname: 'Bob',
      lastname: 'Smith',
      email: 'bob.smith@email.com',
    },
    {
      id: 3,
      firstname: 'Charlie',
      lastname: 'Brown',
      email: 'charlie.brown@email.com',
    },
  ];

  private baseUrl: string = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return of(this.mockUsers);
    // return this.http.get<Users[]>(`${this.baseUrl}/show`)
  }

  getUser(id: number): Observable<Users | undefined> {
    const user = this.mockUsers.find((user) => user.id === id);
    return of(user);
    // return this.http.get<Users>(`${this.baseUrl}/show/${id}`);
  }

  updateUser(id: number, updatedUser: Users): Observable<Users> {
    const index = this.mockUsers.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.mockUsers[index] = { ...updatedUser, id }; // conserve l'ID d'origine
    }
    return of(this.mockUsers[index]);
    // return this.http.put<Users>(`${this.baseUrl}/update/${id}`, user);
  }

  deleteUser(id: number): Observable<Users[]> {
    this.mockUsers = this.mockUsers.filter((user) => user.id === id);
    return of(this.mockUsers);
    // return this.http.delete<Users>(`${this.baseUrl}/delete/${id}`)
  }
}
