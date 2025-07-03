import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  form: FormGroup;
  genderOptions: string[];
  profileOptions: string[];
  errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<PersonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = data.form;
    this.genderOptions = data.genderOptions;
    this.profileOptions = data.profileOptions;
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close('submitted');
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
