import { Component, Output, EventEmitter, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FakeAuthService } from '../../../core/services/fake-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  editMode: boolean = false;
  title = signal<string>(localStorage.getItem('siteTitle') || 'ShuffleMyTeam');
  tempTitle = signal<string>(this.title());

  editTitle() {
    this.tempTitle.set(this.title());
    this.editMode = true;
  }

  saveTitle() {
    const newTitle = this.tempTitle().trim();
    if (newTitle.length > 0) {
      this.title.set(newTitle);
      localStorage.setItem('siteTitle', newTitle);
    } else {
      alert("Titre invalide")
    }
    this.editMode = false;
  }
  // Formulaire réactif avec 2 champs
  loginForm: FormGroup;

  // Output pour dire au parent : "ouvre la modale d’inscription"
  @Output() openSignup = new EventEmitter<void>();
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: FakeAuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Soumission du formulaire de connexion
  onSubmit() {
    const { email, password } = this.loginForm.value;
    console.log('Tentative de connexion avec :', email, password); // 👈 TEST 1

    this.auth.login(email, password).subscribe({
      next: (user) => {
        console.log('Connexion réussie :', user); // 👈 TEST 2
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erreur de connexion :', err); // 👈 TEST 3
        this.errorMessage = 'Email ou mot de passe incorrect';
      },
    });
  }

  onSignupClick() {
    this.openSignup.emit(); // ✅ dit au parent "ouvre la modale"
  }
}
