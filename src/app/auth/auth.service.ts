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
  private readonly apiUrl = 'https://v3-tirso.feras.fr/api';

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
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('🧪 Appel dans AuthService', credentials);

    const adaptedCredentials = {
      username: credentials.email,
      password: credentials.password,
    };

    // Création des en-têtes HTTP personnalisés

    console.log('🧪 Données finales envoyées par HttpClient :', credentials);

    // Envoi de la requête POST à l’API avec les identifiants
    return this.http.post(`${this.apiUrl}/login`, adaptedCredentials).pipe(
      map((res: any) => {
        // Stockage du token et de l'utilisateur dans le localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        return res; // renvoie la réponse complète
      })
    );
  }

/**
   * 🚪 Déconnexion
   * Supprime les données de l’utilisateur du localStorage
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    const existing = mockUsers.find((u) => u.email === formData.email);
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
