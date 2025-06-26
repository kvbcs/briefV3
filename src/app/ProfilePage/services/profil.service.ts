import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private userMock: User = {
    lastname: 'Dupont',
    firstname: 'Marie',
    email: 'marie.dupont@example.com',
    createdAt: new Date('2024-01-01'),
    cguAcceptedAt: new Date('2024-01-01'),
  };

  getUser(): Observable<User> {
    return of(this.userMock);
  }
   updateUser(updated: User): Observable<User> {
  this.userMock = { ...updated };
  return of(this.userMock);
}
deleteUser(): Observable<void> {
  console.log('Utilisateur supprimé (simulé)');
  return of();
}

}
