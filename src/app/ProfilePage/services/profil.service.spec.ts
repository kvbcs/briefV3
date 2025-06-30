import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ classique et fiable
import { ProfilService } from './profil.service';
import { User } from '../models/user.model';

describe('ProfilService', () => {
  let service: ProfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ fourni HttpClient pour le service
    });

    service = TestBed.inject(ProfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a mock user from getUser()', (done) => {
    service.getUser().subscribe((user) => {
      expect(user.firstname).toBeDefined();
      expect(user.email).toContain('@');
      done(); // pour dire que le test est asynchrone terminé
    });
  });
  it('should update and return the new user from updateUser()', (done) => {
    const updatedUser: User = {
      firstname: 'Updated',
      lastname: 'Name',
      email: 'updated@example.com',
      createdAt: new Date(),
      cguAcceptedAt: new Date(),
    };

    service.updateUser(updatedUser).subscribe((result) => {
      expect(result.firstname).toBe('Updated');
      expect(result.email).toBe('updated@example.com');
      done();
    });
  });
  it('should complete deleteUser() without error', (done) => {
    service.deleteUser().subscribe({
      next: (res) => {
        expect(res).toBeUndefined(); // car l'observable est vide
        done();
      },
      error: () => {
        fail('deleteUser() should not throw an error');
        done();
      },
    });
  });
});
