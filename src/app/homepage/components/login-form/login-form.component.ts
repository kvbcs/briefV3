import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FakeAuthService } from '../../../core/services/fake-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  // Formulaire réactif avec 2 champs
  loginForm: FormGroup;

  // Output pour dire au parent : "ouvre la modale d’inscription"
  @Output() openSignup = new EventEmitter<void>();
  errorMessage: string = '';

  constructor(private readonly fb: FormBuilder, private readonly auth: FakeAuthService,  private readonly router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  // Soumission du formulaire de connexion
 onSubmit() {
    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).subscribe({
      next: user => {
        console.log('Connexion réussie :', user);
        this.errorMessage = '';
        // rediriger plus tard si besoin
      },
      error: err => {
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }

  // Clic sur "S’inscrire"
  onSignupClick() {
  this.router.navigate(['/signup'])
}

  
}
