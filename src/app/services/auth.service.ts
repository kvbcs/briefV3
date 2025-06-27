import { Injectable } from '@angular/core';

// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Simulation d’un utilisateur connecté
  private currentUser = {
    name: 'Marie',
    email: 'marie@example.com',
    role: 'user', // 🔁 change en 'user' pour tester l'autre cas
  };

  getCurrentUser() {
    return this.currentUser;
  }

  getCurrentUserRole(): 'admin' | 'user' {
    return this.currentUser.role === 'admin' ? 'admin' : 'user';
  }
}
