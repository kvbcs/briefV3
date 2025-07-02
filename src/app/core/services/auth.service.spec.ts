// import { AuthService } from './auth.service';
// import { HttpClient } from '@angular/common/http';
// import { of, throwError } from 'rxjs';

// describe('AuthService (standalone)', () => {
//   let service: AuthService;
//   let httpSpy: jasmine.SpyObj<HttpClient>;

//   beforeEach(() => {
//     httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
//     service = new AuthService(httpSpy);
//     localStorage.clear();
//   });

//   afterEach(() => {
//     localStorage.clear();
//   });

//   it('devrait réussir la connexion avec de bons identifiants', (done) => {
//     const credentials = { identifier: 'test@mail.com', password: '1234' };
//     const mockResponse = {
//       token: 'fake-token',
//       user: { id: 1, email: 'test@mail.com' }
//     };

//     httpSpy.post.and.returnValue(of(mockResponse));

//     service.login(credentials).subscribe((res) => {
//       expect(res).toEqual(mockResponse);
//       expect(localStorage.getItem('token')).toBe('fake-token');
//       expect(JSON.parse(localStorage.getItem('user')!)).toEqual(mockResponse.user);
//       done();
//     });
//   });

//   it('devrait échouer si l’API retourne une erreur', (done) => {
//     const credentials = { identifier: 'wrong@mail.com', password: 'wrongpass' };
//     const errorResponse = { message: 'Identifiants incorrects' };

//     httpSpy.post.and.returnValue(throwError(() => errorResponse));

//     service.login(credentials).subscribe({
//       next: () => {
//         fail('La connexion aurait dû échouer');
//         done();
//       },
//       error: (err) => {
//         expect(err).toEqual(errorResponse);
//         done();
//       }
//     });
//   });

//   it('devrait retourner l’utilisateur connecté depuis localStorage', () => {
//     const mockUser = { id: 1, email: 'user@mail.com' };
//     localStorage.setItem('user', JSON.stringify(mockUser));

//     const user = service.getConnectedUser();
//     expect(user).toEqual(mockUser);
//   });

//   it('devrait retourner null si aucun utilisateur n’est connecté', () => {
//     expect(service.getConnectedUser()).toBeNull();
//   });

//   it('devrait appeler l’API pour enregistrer un nouvel utilisateur', (done) => {
//     const newUser = { email: 'new@mail.com', password: '123456' };

//     httpSpy.post.and.returnValue(of(newUser));

//     service.register(newUser).subscribe((res) => {
//       expect(res).toEqual(newUser);
//       expect(httpSpy.post).toHaveBeenCalledWith(jasmine.any(String), newUser);
//       done();
//     });
//   });

//   it('devrait supprimer token et user au logout', () => {
//     localStorage.setItem('token', 'token');
//     localStorage.setItem('user', JSON.stringify({ email: 'bye@mail.com' }));

//     service.logout();

//     expect(localStorage.getItem('token')).toBeNull();
//     expect(localStorage.getItem('user')).toBeNull();
//   });
// });
