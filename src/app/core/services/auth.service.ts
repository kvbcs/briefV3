import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {

  // 🔗 URL de base de l’API de production
  private readonly apiUrl = 'https://v3-tirso.feras.fr/api';

  constructor(@Inject(HttpClient) private readonly http: HttpClient) { }

  /**
   * 🔐 Méthode de connexion
   * Envoie les identifiants à l'API, stocke le token et l'utilisateur dans le localStorage
   */
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((res: any) => {
        localStorage.setItem('token', res.token); // Stocke le token JWT
        localStorage.setItem('user', JSON.stringify(res.user)); // Stocke les infos de l'utilisateur
        return res; // Retourne la réponse complète
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

  /**
   * 👤 Récupère l'utilisateur connecté depuis le localStorage
   */
  getConnectedUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * 📝 Inscription d’un nouvel utilisateur
   * Envoie les données du formulaire à l’API
   */
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

}
