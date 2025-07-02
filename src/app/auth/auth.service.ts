import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { mockUsers } from '../mocks/mock-data';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  // 📡 Injection du client HTTP Angular via la fonction `inject()` (nouvelle syntaxe Angular)
  private http = inject(HttpClient);

  // 🔒 URL de base de l’API utilisée pour les appels liés à l’authentification
  private readonly apiUrl = 'http://193.134.250.16/api';

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  /**
   * 🔐 Méthode de connexion
   * Envoie les identifiants de connexion à l’API et enregistre le token et l’utilisateur dans le localStorage
   */
  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map((res) => {
        if (res.success && res.token && res.user) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          this.currentUser = res.user;
          return res.user;
        } else {
          throw new Error(res.message || 'Erreur de connexion');
        }
      })
    );
  }

  /**
   * 🚪 Déconnexion
   * Supprime les données de l’utilisateur du localStorage
   */
  logout(): void {
  this.http.post(`${this.apiUrl}/logout`, {})
    .subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession(),
    });
}


private clearSession(): void {
  this.currentUser = null;
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
}


 isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}


  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserRole(): string {
    const user = this.currentUser; // ou JSON.parse(localStorage.getItem('user'))
    const roles = user?.roles;

    if (Array.isArray(roles) && roles.includes('admin')) {
      return 'admin';
    }

    return 'user';
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

  register(formData: {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    cgu_accepted: boolean;
  }): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/register`, formData).pipe(
      map((res) => {
        if (res.success && res.user) {
          localStorage.removeItem('token'); // ← si une ancienne session reste en cache
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          this.currentUser = res.user;
          return res.user;
        } else {
          throw new Error(res.message || 'Erreur lors de l’inscription');
        }
      })
    );
  }
}
