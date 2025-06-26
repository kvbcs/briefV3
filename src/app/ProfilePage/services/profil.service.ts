import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root', // Le service est accessible globalement dans l'application
})
export class ProfilService {
    // Utilisateur simulé, utilisé pour tester sans appel API

  private userMock: User = {
    lastname: 'Dupont',
    firstname: 'Marie',
    email: 'marie.dupont@example.com',
    createdAt: new Date('2024-01-01'),
    cguAcceptedAt: new Date('2024-01-01'),
  };

    // Méthode simulant un appel GET vers l'API pour récupérer l'utilisateur
  getUser(): Observable<User> {
    return of(this.userMock); // Crée un observable avec l'utilisateur factice
  }

    // Méthode simulant la mise à jour du profil utilisateur
   updateUser(updated: User): Observable<User> {
  this.userMock = { ...updated }; // Remplace le mock par les nouvelles données
  return of(this.userMock); // Renvoie les données mises à jour comme si le serveur avait répondu
}

  // Méthode simulant la suppression du compte utilisateur
deleteUser(): Observable<void> {
  console.log('Utilisateur supprimé (simulé)');
  return of(); // Renvoie un observable vide (comme si la suppression avait réussi)
}

}
