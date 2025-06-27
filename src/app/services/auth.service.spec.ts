import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the current user object', () => {
    const user = service.getCurrentUser();
    expect(user).toEqual({
      name: 'Marie',
      email: 'marie@example.com',
      role: 'user'
    });
  });

  it('should return "user" as the current role by default', () => {
    expect(service.getCurrentUserRole()).toBe('user');
  });

  it('should return "admin" when the role is set to admin', () => {
    // 🔧 accès direct pour test
    (service as any).currentUser.role = 'admin';
    expect(service.getCurrentUserRole()).toBe('admin');
  });

  it('should return "user" when the role is unknown', () => {
    (service as any).currentUser.role = 'something-else';
    expect(service.getCurrentUserRole()).toBe('user');
  });
});
