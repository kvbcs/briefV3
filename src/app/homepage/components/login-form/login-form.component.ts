import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  // Formulaire réactif avec 2 champs
  loginForm: FormGroup;

  // Output pour dire au parent : "ouvre la modale d’inscription"
  @Output() openSignup = new EventEmitter<void>();

  constructor(private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Soumission du formulaire de connexion
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Connexion avec :', this.loginForm.value);
      // TODO: appeler un service d’authentification
    } else {
      console.warn('Formulaire de connexion invalide');
    }
  }

  // Clic sur "S’inscrire"
  onSignupClick() {
    this.openSignup.emit();
  }
}
