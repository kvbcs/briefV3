import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { mockUsers } from '../mocks/mock-data';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private currentUser: User | null = null;
private http = inject(HttpClient);
  
  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  };

login(email: string, password: string): Observable<User> {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return of(user); // ✅ observable simulé
  }
  return throwError(() => new Error('Email ou mot de passe incorrect'));
}


  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserRole(): 'admin' | 'user' {
    if (!this.currentUser) return 'user';
    return this.currentUser.roles.includes('ROLE_ADMIN') ? 'admin' : 'user';
  }

  needsToAcceptTerms(): boolean {
    if (!this.currentUser?.cgu_accepted_at) return true;

    const lastAccepted = new Date(this.currentUser.cgu_accepted_at);
    const thirteenMonthsAgo = new Date();
    thirteenMonthsAgo.setMonth(thirteenMonthsAgo.getMonth() - 13);

    return lastAccepted < thirteenMonthsAgo;
  }

  acceptTerms(): void {
    if (!this.currentUser) return;

    this.currentUser.cgu_accepted_at = new Date().toISOString();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  updateUser(updatedUser: Partial<User>): void {
    if (!this.currentUser) return;

    Object.assign(this.currentUser, updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  deleteAccount(): void {
    this.logout();
  }

  // Optionnel : inscription côté mock
  register(formData: any): Observable<User> {
  const existing = mockUsers.find(u => u.email === formData.email);
  if (existing) {
    return throwError(() => new Error('Email déjà utilisé'));
  }

  const newUser: User = {
    id: Date.now(),
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    password: formData.password,
    roles: ['ROLE_USER'],
    is_verified: false,
    is_blocked: false,
    created_at: new Date().toISOString(),
    cgu_accepted_at: '',
  };

  mockUsers.push(newUser);
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return of(newUser);
}

}
