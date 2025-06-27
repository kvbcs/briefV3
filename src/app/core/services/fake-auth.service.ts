import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FakeAuthService {
  private readonly mockUrl = 'assets/mock-data.json';

  constructor(private readonly http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(this.mockUrl).pipe(
      map(data => {
        const user = data.users.find(
          (u: any) => u.email === email && u.password === password
        );
        if (!user) {
          throw new Error('Identifiants incorrects');
        }

        // Simule une session utilisateur avec localStorage
        localStorage.setItem('connectedUser', JSON.stringify(user));
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('connectedUser');
  }

  getConnectedUser(): any {
    const user = localStorage.getItem('connectedUser');
    return user ? JSON.parse(user) : null;
  }

  register(user: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const exists = users.find((u: any) => u.email === user.email);

    if (exists) {
      throw new Error('Email déjà utilisé');
    }

    const newUser = {
      ...user,
      emailConfirmed: false // L’email n’est pas encore confirmé
    };

    users.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(users));
    localStorage.setItem('connectedUser', JSON.stringify(newUser));

    console.log(`Un email de confirmation a été envoyé à ${user.email}`);

    return new Observable(observer => {
      observer.next(newUser);
      observer.complete();
    });
  }


}
