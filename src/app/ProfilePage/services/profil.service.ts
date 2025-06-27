import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ProfilService {

  private http = inject(HttpClient);

  // Activer les mocks (true = données simulées / false = appel API réel)
  private useMock = true;

  // Données User factices (mock)
  private mockUser: User = {
    lastname: 'Dupont',
    firstname: 'Marie',
    email: 'marie.dupont@example.com',
    createdAt: new Date('2024-01-01'),
    cguAcceptedAt: new Date('2024-01-01'),
  };

  constructor() {}

  /**
   *  Récupère l'utilisateur courant
   * - en mock : retourne un Observable simulé
   * - en prod : effectue un appel GET vers /api/Users/me
   */
  getUser(): Observable<User> {
    if (this.useMock) {
      return of(this.mockUser);
    } else {
      return this.http.get<User>('/api/users/me');
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
      return this.http.put<User>('/api/users/me', updated);
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
    return this.http.delete<void>('/api/users/me');
  }
}

}
