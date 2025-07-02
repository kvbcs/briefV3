<<<<<<< HEAD:src/app/core/services/profile.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ classique et fiable
import { ProfileService } from './profile.service';
import { User } from '../../models/user.model';

describe('ProfilService', () => {
  let service: ProfileService;
=======
// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ classique et fiable
// import { ProfilService } from './profil.service';
// import { User } from '../models/user.model';

// describe('ProfilService', () => {
//   let service: ProfilService;
>>>>>>> 6ffce628da784e71114a27cbe1ea914f5d0bee1b:src/app/ProfilePage/services/profil.service.spec.ts

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule], // ✅ fourni HttpClient pour le service
//     });

<<<<<<< HEAD:src/app/core/services/profile.service.spec.ts
    service = TestBed.inject(ProfileService);
  });
=======
//     service = TestBed.inject(ProfilService);
//   });
>>>>>>> 6ffce628da784e71114a27cbe1ea914f5d0bee1b:src/app/ProfilePage/services/profil.service.spec.ts

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

<<<<<<< HEAD:src/app/core/services/profile.service.spec.ts
  it('should return a mock user from getUser()', (done) => {
    service.getUser().subscribe((user) => {
      expect(user.firstname).toBeDefined();
      expect(user.email).toContain('@');
      done(); // pour dire que le test est asynchrone terminé
    });
  });
  it('should update and return the new user from updateUser()', (done) => {
    const updatedUser: User = {
      first_name: 'Updated',
      last_name: 'Name',
      email: 'updated@example.com',
      created_at: new Date().toISOString(),
      cgu_accepted_at: new Date().toISOString(),
      id: 0,
      roles: [],
      is_verified: false,
      is_blocked: false
    };
=======
//   it('should return a mock user from getUser()', (done) => {
//     service.getUser().subscribe((user) => {
//       expect(user.firstname).toBeDefined();
//       expect(user.email).toContain('@');
//       done(); // pour dire que le test est asynchrone terminé
//     });
//   });
//   it('should update and return the new user from updateUser()', (done) => {
//     const updatedUser: User = {
//       firstname: 'Updated',
//       lastname: 'Name',
//       email: 'updated@example.com',
//       createdAt: new Date(),
//       cguAcceptedAt: new Date(),
//     };
>>>>>>> 6ffce628da784e71114a27cbe1ea914f5d0bee1b:src/app/ProfilePage/services/profil.service.spec.ts

//     service.updateUser(updatedUser).subscribe((result) => {
//       expect(result.firstname).toBe('Updated');
//       expect(result.email).toBe('updated@example.com');
//       done();
//     });
//   });
//   it('should complete deleteUser() without error', (done) => {
//     service.deleteUser().subscribe({
//       next: (res) => {
//         expect(res).toBeUndefined(); // car l'observable est vide
//         done();
//       },
//       error: () => {
//         fail('deleteUser() should not throw an error');
//         done();
//       },
//     });
//   });
// });
