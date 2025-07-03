import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(private toast: ToastrService, private readonly router: Router) {}

  // Injection du service Profil et du FormBuilder (avec la syntaxe `inject()`)
  private profilService = inject(ProfileService);
  private formBuilder = inject(FormBuilder);
  private authservice = inject(AuthService);

  // Objet utilisateur à afficher et modifier
  user!: User;

  editMode: boolean = false;

  // Formulaire réactif pour modifier nom/prénom
  profileForm!: FormGroup;

  ngOnInit(): void {
    // Récupération de l'utilisateur mocké via le service
    this.profilService.getUser().subscribe((data) => {
      this.user = data; // Stockage local
      this.initForm(); // Initialisation du formulaire avec les valeurs récupérées
    });
  }
  // Création du formulaire avec les données existantes
  initForm(): void {
    if (!this.user) return; // Protection simple

    this.profileForm = this.formBuilder.group({
      email: [this.user.email],
      firstname: [this.user.first_name],
      lastname: [this.user.last_name],
    });
  }

  // Active ou désactive le mode édition (affichage formulaire)
  toggleEditMode(): void {
  if (this.editMode === false) {
    this.editMode = true;
    console.log('🌀 toggle activé');
  }
}


  // Sauvegarde les modifications : fusionne les nouvelles données avec l'utilisateur existant
  save(): void {
    console.log('💾 save() appelé');
    const updatedUser = {
      ...this.user, // Copie des anciennes données
      ...this.profileForm.value, // Remplacement de firstname / lastname
    };
    this.profilService.updateUser(updatedUser).subscribe((response) => {
      console.log('✅ Réponse du backend :', response);
      this.user = response; // Mise à jour locale
      console.log('🧠 Nouveau user :', this.user);
      this.toast.success('Informations mises à jour', 'Succès');
      console.log('✏️ Mode édition ? =>', this.editMode);
      this.editMode = false; // Retour en mode lecture
      setTimeout(() => {
        console.log('📦 editMode après 100ms :', this.editMode);
      }, 100);
    });
  }

  // Suppression simulée du compte avec message de confirmation et redirection
  confirmDelete(): void {
    const confirmed = confirm('Es-tu sûr(e) de vouloir supprimer ton compte ?');
    if (confirmed) {
      this.profilService.deleteUser().subscribe(() => {
        this.toast.success('Compte supprimé', 'Succès');
        this.authservice.logout(); // 🔥 déconnexion propre
        this.router.navigate(['/']); // 🧭 redirection
      });
    }
  }
}
