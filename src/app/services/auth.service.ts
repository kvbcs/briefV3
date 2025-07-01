import { Injectable } from '@angular/core';

// Service simulant l'authentification utilisateur
@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * Simule un utilisateur actuellement connecté.
   * En production, ces données viendraient d'un backend (via un token ou une session).
   */
  private currentUser = {
    name: 'Marie',
    email: 'marie@example.com',
    role: 'user', // peut être 'admin' ou 'user'
  };

  /**
   * Renvoie l'objet utilisateur courant.
   * Utile pour accéder à des informations comme le nom ou l'email.
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Renvoie uniquement le rôle de l'utilisateur courant ('admin' ou 'user').
   * En cas de valeur inattendue, renvoie 'user' par défaut pour sécuriser le comportement.
   */
  getCurrentUserRole(): 'admin' | 'user' {
    return this.currentUser.role === 'admin' ? 'admin' : 'user';
  }
}
