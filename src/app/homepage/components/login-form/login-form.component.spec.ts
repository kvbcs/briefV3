import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { of, throwError } from 'rxjs';
import { FakeAuthService } from '../../../core/services/fake-auth.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, ReactiveFormsModule],
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: FakeAuthService, useClass: FakeAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should have required errors on empty fields', () => {
  const emailCtrl = component.loginForm.get('email');
  const passwordCtrl = component.loginForm.get('password');

  // on force la validation
  emailCtrl?.setValue('');
  emailCtrl?.markAsTouched();
  emailCtrl?.updateValueAndValidity();

  passwordCtrl?.setValue('');
  passwordCtrl?.markAsTouched();
  passwordCtrl?.updateValueAndValidity();

  expect(emailCtrl?.errors?.['required']).toBeTrue();
  expect(passwordCtrl?.errors?.['required']).toBeTrue();
});





  it('should be valid with correct credentials', () => {
    component.loginForm.setValue({
      email: 'test@mail.com',
      password: '123456'
    });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call login on submit', () => {
    spyOn(component['auth'], 'login').and.returnValue(of({ email: 'test@mail.com' }));

    component.loginForm.setValue({
      email: 'test@mail.com',
      password: '123456'
    });

    component.onSubmit();

    expect(component['auth'].login).toHaveBeenCalledWith('test@mail.com', '123456');
  });

  it('should show error message on login failure', () => {
    spyOn(component['auth'], 'login').and.returnValue(throwError(() => new Error('Erreur')));

    component.loginForm.setValue({
      email: 'wrong@mail.com',
      password: 'fail'
    });

    component.onSubmit();

    expect(component.errorMessage).toBe('Email ou mot de passe incorrect');

  });
});
