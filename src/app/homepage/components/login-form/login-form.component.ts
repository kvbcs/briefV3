import { Component, Output, EventEmitter, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FakeAuthService } from '../../../core/services/fake-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  logo = signal<string>(localStorage.getItem('siteLogo') || 'assets/logo.png');
  tempLogo = signal<string>(this.logo());
  editModeLogo: boolean = false;
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
      this.toast.success('Titre modifié', 'Succès');
      localStorage.setItem('siteTitle', newTitle);
    } else {
      this.toast.error('Titre invalide', 'Erreur');
    }
    this.editMode = false;
  }

  editLogo() {
    this.editModeLogo = true;
    this.tempLogo.set(this.logo());
  }

  saveLogo(event?: Event) {
    const input = event?.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.logo.set(result);
        this.tempLogo.set(result);
        localStorage.setItem('siteLogo', result);
        this.toast.success('Logo modifié', 'Succès');
        this.editModeLogo = false;
      };
      reader.readAsDataURL(file); // conversion en base64
    } else {
      // fallback si aucune image sélectionnée
      this.toast.error('Fichier invalide', 'Erreur'),
        (this.editModeLogo = false);
    }
  }
  // private router = new Router()
  // Formulaire réactif avec 2 champs
  loginForm: FormGroup;

  // Output pour dire au parent : "ouvre la modale d’inscription"
  @Output() openSignup = new EventEmitter<void>();
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: FakeAuthService,
    private readonly router: Router,
    private toast: ToastrService
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
        this.toast.success('Connexion réussie', 'Succès');
        this.router.navigate(['/profil']);
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erreur de connexion :', err); // 👈 TEST 3
        this.errorMessage = 'Email ou mot de passe incorrect';
        this.toast.error('Email ou mot de passe incorrect', 'Erreur');
      },
    });
  }

  onSignupClick() {
    this.openSignup.emit(); // ✅ dit au parent "ouvre la modale"
  }
}
