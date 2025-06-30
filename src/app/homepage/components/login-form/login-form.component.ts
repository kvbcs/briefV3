import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  // Formulaire réactif avec 2 champs (email et mot de passe)
  loginForm: FormGroup;

  // Pour dire au composant parent "ouvre la modale d’inscription"
  @Output() openSignup = new EventEmitter<void>();

  // Message d’erreur à afficher si la connexion échoue
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    // Initialisation du formulaire avec validation des champs
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * 🔐 Soumission du formulaire de connexion
   * Envoie les identifiants à l'API (avec 'identifier' attendu par le backend),
   * gère la réponse et redirige vers /profile en cas de succès
   */
  onSubmit() {
    const { email, password } = this.loginForm.value;

    console.log('Tentative de connexion avec :', email, password);

    // ⚠️ L'API attend 'identifier' au lieu de 'email'
    this.auth.login({ identifier: email, password }).subscribe({
      next: (user: any) => {
        console.log('Connexion réussie :', user);
        this.errorMessage = '';
        this.router.navigate(['/profile']); // Redirection si tout va bien
      },
      error: (err: any) => {
        console.error('Erreur de connexion :', err);
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }

  /**
   * 📩 Appelé quand on clique sur "Créer un compte"
   * Informe le parent pour qu’il ouvre la modale d’inscription
   */
  onSignupClick() {
    this.openSignup.emit();
  }

}
