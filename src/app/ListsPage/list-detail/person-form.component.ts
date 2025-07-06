import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ListPersonService } from '../../core/services/list-person.service';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  form: FormGroup;
  genderOptions = ['Masculin', 'Féminin', 'Autre'];
  profileOptions = ['Timide', 'Leader', 'Discret', 'Autre']; // ou ce que ton API accepte
  listSlug!: string;
  errorMessage: any;
  isEditMode: boolean = false; // Indique si le formulaire est en mode édition ou création

  constructor(
    private readonly fb: FormBuilder,
    private readonly listPersonService: ListPersonService,
    private readonly dialogRef: MatDialogRef<PersonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.listSlug = data.listSlug;
console.log(data);

    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      gender: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(1), Validators.max(99)]],
      french_level: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
      tech_level: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
      dwwm: [false, Validators.required],
      profile: ['', Validators.required]
    });
    this.isEditMode = !!data.person;
    if (this.isEditMode) {
      this.form.patchValue(data.person);
    }
  }
  
// Pré-remplir le formulaire si édition
// onSubmit(): void {
//   if (this.form.valid && this.data.listSlug) {
// const personData = {
//   ...this.form.value,
//   first_name: String(this.form.value.first_name),
//     last_name: String(this.form.value.last_name),
//   gender: String(this.form.value.gender),

//   age: Number(this.form.value.age),
//   profile: String(this.form.value.profile),
//   french_level: Number(this.form.value.french_level),
//   tech_level: Number(this.form.value.tech_level),
//   dwwm: Boolean(this.form.value.dwwm)
// };
// console.log(personData);

// this.listPersonService.addPersonToList(this.data.listSlug, personData).subscribe({
//   next: () => this.dialogRef.close('success'),
//   error: (err) => {
//     console.error('Erreur API:', err);
//     this.dialogRef.close('error');
//   }
// });
//   }
// }


onSubmit(): void {
  if (this.form.valid && this.data.listSlug) {
    const formValue = this.form.value;
    const personData = {
      first_name: formValue.first_name?.trim(),
      last_name: formValue.last_name?.trim(),
      gender: formValue.gender,
  age: Number(formValue.age),
  profile: formValue.profile,
  french_level: Number(formValue.french_level),
  tech_level: Number(formValue.tech_level),
  dwwm: Boolean(formValue.dwwm),
  list: this.data.listSlug
  };
  console.log(this.isEditMode);
if (this.isEditMode) {
        // Edition
        this.listPersonService.updatePerson(this.data.person.slug, personData).subscribe({
          next: () => this.dialogRef.close('success'),
          error: (err) => {
            this.errorMessage = err?.error?.message || 'Erreur lors de la modification';
          }
        });
      } else {
        // Création

    console.log('Payload envoyé à l’API :', personData);

    this.listPersonService.addPersonToList(this.data.listSlug, personData).subscribe({
      next: () => this.dialogRef.close('success'),
      error: (err) => {
        console.error('Erreur API:', err);
        this.dialogRef.close('error');
        console.warn('Formulaire invalide ou slug manquant');
      }
    });
  }
  }
}
onCancel(): void {
  this.dialogRef.close('success');

}
}
