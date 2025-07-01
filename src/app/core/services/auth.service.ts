// ✅ Import des modules nécessaires depuis Angular et RxJS
import { Injectable, inject } from '@angular/core'; // Pour créer un service injectable dans l'application
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Pour effectuer des requêtes HTTP
import { Observable, map } from 'rxjs'; // Pour gérer les flux de données asynchrones

// ✅ Ce décorateur rend le service injectable dans toute l'application (injection globale)
@Injectable({ providedIn: 'root' })
export class AuthService {
  // 🔒 URL de base de l’API utilisée pour les appels liés à l’authentification
  private readonly apiUrl = 'https://v3-tirso.feras.fr/api';

  // 📡 Injection du client HTTP Angular via la fonction `inject()` (nouvelle syntaxe Angular)
  private readonly http = inject(HttpClient);

  /**
   * 🔐 Méthode de connexion
   * Envoie les identifiants de connexion à l’API et enregistre le token et l’utilisateur dans le localStorage
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('🧪 Appel dans AuthService', credentials);

    const adaptedCredentials = {
      username: credentials.email, 
      password: credentials.password
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

  /**
   * 👤 Récupère l'utilisateur connecté depuis le localStorage
   * Retourne l'objet utilisateur ou null si non connecté
   */
  getConnectedUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * 📝 Inscription d’un nouvel utilisateur
   * Envoie les données du formulaire d’inscription à l’API
   */
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
