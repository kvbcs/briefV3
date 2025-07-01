// ✅ Importation des modules nécessaires Angular
import { Component, Output, EventEmitter } from '@angular/core'; // Pour créer le composant et émettre des événements vers le parent
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Pour créer et valider un formulaire réactif
import { Router } from '@angular/router'; // Pour naviguer entre les routes Angular
import { AuthService } from '../../../core/services/auth.service'; // Service d’authentification personnalisé

// ✅ Déclaration du composant avec métadonnées
@Component({
  selector: 'app-login-form', // nom de la balise utilisée dans le HTML
  standalone: true,           // composant autonome, sans passer par un module Angular classique
  imports: [ReactiveFormsModule], // modules nécessaires pour les formulaires réactifs
  templateUrl: './login-form.component.html', // chemin du fichier HTML associé
  styleUrls: ['./login-form.component.css']   // chemin du fichier CSS associé
})
export class LoginFormComponent {

  // ✅ Déclaration d’un groupe de contrôles de formulaire
  loginForm: FormGroup;

  // ✅ Déclaration d’un événement envoyé au parent quand l’utilisateur veut s’inscrire
  @Output() openSignup = new EventEmitter<void>();

  // ✅ Message affiché si erreur de connexion
  errorMessage = '';

  // ✅ Injection des services nécessaires via le constructeur
  constructor(
    private readonly fb: FormBuilder, // pour construire le formulaire
    private readonly auth: AuthService, // pour appeler l’API de login
    private readonly router: Router // pour rediriger après connexion
  ) {
    // ✅ Initialisation du formulaire avec des champs et des validateurs
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // champ requis + format email
      password: ['', [Validators.required]] // champ requis
    });
  }

  // ✅ Méthode appelée à la soumission du formulaire
  onSubmit(): void {
    const { email, password } = this.loginForm.value; // extraction des valeurs

    console.log('🧪 Données envoyées à l’API :', { email, password });

    // ✅ Appel du service d’authentification
    this.auth.login({ email, password }).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/profil']); // redirection vers la page profil
      },
      error: (err) => {
        console.error('❌ Erreur reçue depuis l’API :', err);
        if (err.status === 400) {
          this.errorMessage = 'Requête invalide : vérifiez vos champs.';
        } else if (err.status === 401) {
          this.errorMessage = 'Identifiants incorrects.';
        } else {
          this.errorMessage = 'Erreur inattendue, veuillez réessayer.';
        }
      }


    });
  }

  // ✅ Méthode déclenchée lors du clic sur "Créer un compte"
  onSignupClick(): void {
    this.openSignup.emit(); // envoie un événement vers le parent
  }
}
