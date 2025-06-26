import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfilService } from '../services/profil.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfilComponent implements OnInit {
  private profilService = inject(ProfilService);
  private fb = inject(FormBuilder);

  user!: User;
  editMode = signal(false); 
  profileForm!: FormGroup;

  ngOnInit(): void {
    this.profilService.getUser().subscribe((data) => {
      this.user = data;
      this.initForm();
    });
  }

   initForm(): void {
    this.profileForm = this.fb.group({
      firstname: [this.user.firstname],
      lastname: [this.user.lastname],
    });
  }
 toggleEditMode(): void {
    this.editMode.update((val) => !val);
  }

  save(): void {
    const updatedUser = {
      ...this.user,
      ...this.profileForm.value,
    };
     this.profilService.updateUser(updatedUser).subscribe((res) => {
      this.user = res;
      this.editMode.set(false);
    });
  }
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