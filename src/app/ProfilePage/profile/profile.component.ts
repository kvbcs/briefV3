import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {

    // Injection du service Profil et du FormBuilder (avec la syntaxe `inject()`)
  private profilService = inject(ProfileService);
  private formBuilder = inject(FormBuilder);

    // Objet utilisateur à afficher et modifier
  user!: User;

    // Booléen réactif pour afficher le formulaire ou non
  editMode = signal(false); 

    // Formulaire réactif pour modifier nom/prénom
  profileForm!: FormGroup;

  ngOnInit(): void {
        // Récupération de l'utilisateur mocké via le service
    this.profilService.getUser().subscribe((data) => {
      this.user = data;  // Stockage local
      this.initForm();  // Initialisation du formulaire avec les valeurs récupérées
    });
  }
  // Création du formulaire avec les données existantes
   initForm(): void {
  if (!this.user) return; // Protection simple

  this.profileForm = this.formBuilder.group({
    firstname: [this.user.first_name],
    lastname: [this.user.last_name],
  });
}


    // Active ou désactive le mode édition (affichage formulaire)
 toggleEditMode(): void {
    this.editMode.update((currentValue) => !currentValue);
  }

    // Sauvegarde les modifications : fusionne les nouvelles données avec l'utilisateur existant
  save(): void {
    const updatedUser = {
      ...this.user, // Copie des anciennes données
      ...this.profileForm.value, // Remplacement de firstname / lastname
    };
     this.profilService.updateUser(updatedUser).subscribe((response) => {
      this.user = response; // Mise à jour locale
      this.editMode.set(false); // Retour en mode lecture
    });
  }

    // Suppression simulée du compte avec message de confirmation et redirection
 confirmDelete(): void {
  const confirmed = confirm("Es-tu sûr(e) de vouloir supprimer ton compte ? Cette action est irréversible.");
  if (confirmed) {
    this.profilService.deleteUser().subscribe(() => {
      // Redirection après suppression
      window.location.href = '/'; // ou via le router si besoin
    });
  }
}

}