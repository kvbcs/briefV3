import { FakeAuthService } from './fake-auth.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('FakeAuthService (standalone)', () => {
  let service: FakeAuthService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new FakeAuthService(httpSpy);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('devrait réussir la connexion avec de bons identifiants', (done) => {
    const mockUser = { email: 'test@mail.com', password: '1234' };
    const mockData = { users: [mockUser] };

    httpSpy.get.and.returnValue(of(mockData));

    service.login('test@mail.com', '1234').subscribe((user) => {
      expect(user).toEqual(mockUser);
      done();
    });
  });

  it('devrait échouer si les identifiants sont incorrects', (done) => {
    const mockData = { users: [{ email: 'another@mail.com', password: 'abcd' }] };
    httpSpy.get.and.returnValue(of(mockData));

    service.login('wrong@mail.com', 'wrongpass').subscribe({
      next: () => {
        fail('La connexion aurait dû échouer');
        done();
      },
      error: (err) => {
        expect(err.message).toBe('Identifiants incorrects');
        done();
      }
    });
  });

  it('devrait retourner l’utilisateur connecté', () => {
    const mockUser = { email: 'user@mail.com' };
    localStorage.setItem('connectedUser', JSON.stringify(mockUser));

    const user = service.getConnectedUser();
    expect(user).toEqual(mockUser);
  });

  it('devrait retourner null si aucun utilisateur connecté', () => {
    expect(service.getConnectedUser()).toBeNull();
  });

  it('devrait enregistrer un nouvel utilisateur', (done) => {
    const newUser = { email: 'new@mail.com', password: '123' };
    localStorage.setItem('mockUsers', JSON.stringify([]));

    service.register(newUser).subscribe((res) => {
      expect(res.email).toBe('new@mail.com');
      expect(res.emailConfirmed).toBeFalse();
      const stored = JSON.parse(localStorage.getItem('mockUsers')!);
      expect(stored.length).toBe(1);
      done();
    });
  });

  it('devrait refuser l’inscription si l’email existe déjà', () => {
    const user = { email: 'exist@mail.com', password: '123' };
    localStorage.setItem('mockUsers', JSON.stringify([user]));

    expect(() => service.register(user)).toThrowError('Email déjà utilisé');
  });

  it('devrait supprimer l’utilisateur connecté au logout', () => {
    localStorage.setItem('connectedUser', JSON.stringify({ email: 'bye@mail.com' }));
    service.logout();
    expect(localStorage.getItem('connectedUser')).toBeNull();
  });
});
