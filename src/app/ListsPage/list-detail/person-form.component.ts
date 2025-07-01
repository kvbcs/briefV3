import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Gender, Person, Profile } from '../../models/person';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
})
export class PersonFormComponent {
  @Input() personForm!: FormGroup;
  @Input() editingPerson: Person | null = null;
  @Input() genderOptions: string[] = [];
  @Input() profileOptions: string[] = [];
  @Input() errorMessage = '';

  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();
}
