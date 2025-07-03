import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  mockUsers = signal<User[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<User[]>('/assets/users.json').subscribe((data) => {
      this.mockUsers.set(data);
    });
  }

  //Temporaire en attendant le back
  private baseUrl: string = 'http://193.134.250.16/api/';

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
  }

  getUsersSignal() {
    return this.mockUsers;
  }

  getUserByIdSignal(id: number): User | null {
    return this.mockUsers().find((u) => u.id === id) ?? null;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<{data:{ users:User[]}}>(`${this.baseUrl}admin/users`, this.getHeaders()).pipe(map(res => res.data.users))
  }

  getUser(id: number): Observable<User | undefined> {
    const user = this.mockUsers().find((user) => user.id === id);
    return of(user);
    // return this.http.get<Users>(`${this.baseUrl}/show/${id}`);
  }

  updateUser(id: number, updatedUser: User): Observable<User> {
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

  deleteUser(id: number): Observable<User[]> {
    const filtered = this.mockUsers().filter((user) => user.id !== id);
    this.mockUsers.set(filtered);
    return of(filtered);

    // return this.http.delete<Users>(`${this.baseUrl}/delete/${id}`)
  }
}
