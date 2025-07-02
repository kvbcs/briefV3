import { inject, Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { mockUsers } from '../../mocks/mock-data';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  // Activer les mocks (true = données simulées / false = appel API réel)
  private useMock = true;

  // Données User factices (mock)
  private mockUser = mockUsers.find(
    (u) => u.email === 'marie.dupont@example.com'
  )!;

  private readonly API_URL = 'http://193.134.250.16/api';

  constructor() {}

  /**
   *  Récupère l'utilisateur courant
   * - en mock : retourne un Observable simulé
   * - en prod : effectue un appel GET vers /api/Users/me
   */
  getUser(): Observable<User> {
    if (this.useMock) {
      const stored = localStorage.getItem('currentUser');
      if (!stored) return throwError(() => new Error('Utilisateur non trouvé'));
      return of(JSON.parse(stored));
    } else {
      return this.http
        .get<{ success: boolean; data: User }>(`${this.API_URL}/user/show/me`, {
          withCredentials: true,
        })
        .pipe(map((res) => res.data));
    }
  }

  /**
   *  Met à jour l'utilisateur
   * - en mock : met à jour la variable locale
   * - en prod : envoie les nouvelles données via un PUT
   */
  updateUser(updated: User): Observable<User> {
    if (this.useMock) {
      this.mockUser = { ...updated };
      return of(this.mockUser);
    } else {
      return this.http.put<User>(
      `${this.API_URL}/user/update/me`,
      updated,
      { withCredentials: true }
    );
    }
  }

  /**
   * Supprime le compte utilisateur
   * - en mock : affiche un message en console
   * - en prod : appelle l'API DELETE
   */
  deleteUser(): Observable<void> {
    if (this.useMock) {
      console.log('Utilisateur supprimé (mock)');
      return of(undefined); // déclenche bien la chaîne asynchrone
    } else {
      return this.http.delete<void>(
      `${this.API_URL}/user/delete/me`,
      { withCredentials: true }
    );
    }
  }
}
