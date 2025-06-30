import { Injectable, signal } from '@angular/core';
import { Users } from '../../../model/types';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  mockUsers = signal<Users[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<Users[]>('/assets/users.json').subscribe((data) => {
      this.mockUsers.set(data);
    });
  }

  //Temporaire en attendant le back
  private baseUrl: string = 'http://localhost:3000/api/users';

  getUsersSignal() {
    return this.mockUsers;
  }

  getUserByIdSignal(id: number): Users | null {
    return this.mockUsers().find((u) => u.id === id) ?? null;
  }

  getUsers(): Observable<Users[]> {
    return of(this.mockUsers());
    // return this.http.get<Users[]>(`${this.baseUrl}/show`)
  }

  getUser(id: number): Observable<Users | undefined> {
    const user = this.mockUsers().find((user) => user.id === id);
    return of(user);
    // return this.http.get<Users>(`${this.baseUrl}/show/${id}`);
  }

  updateUser(id: number, updatedUser: Users): Observable<Users> {
    const users = this.mockUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      const updatedUsers = [...users];
      updatedUsers[index] = { ...updatedUser, id };
      this.mockUsers.set(updatedUsers);
      return of(updatedUsers[index]);
    } else {
      throw new Error(`Utilisateur ID ${id} non trouvé`);
    }
    // return this.http.put<Users>(`${this.baseUrl}/update/${id}`, user);
  }

  deleteUser(id: number): Observable<Users[]> {
    const filtered = this.mockUsers().filter((user) => user.id !== id);
    this.mockUsers.set(filtered);
    return of(filtered);

    // return this.http.delete<Users>(`${this.baseUrl}/delete/${id}`)
  }
}
