import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent {
  @Output() close = new EventEmitter<void>();

  signupForm: FormGroup;
  submitted = false;

  constructor(private readonly fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log('Inscription simulée :', formData);
      this.close.emit();
    }
  }

  onClose() {
    this.close.emit();
  }
}
