import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


import { FakeAuthService } from '../../../core/services/fake-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})


export class SignupModalComponent {
  @Output() close = new EventEmitter<void>();
  private readonly auth = inject(FakeAuthService);

  signupForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;


  constructor(private readonly fb: FormBuilder, private toast: ToastrService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      emailConfirm: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    }, { validators: [this.matchEmails, this.matchPasswords] });

  }


  onSubmit() {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.auth.register(formData).subscribe({
        next: (user: any) => {
          this.successMessage = 'Inscription réussie ! 🎉 Un email de confirmation vous a été envoyé.';
          this.toast.success(
            'Inscription réussie ! 🎉 Un email de confirmation vous a été envoyé.', "Succès"
          );
          this.signupForm.reset();
          this.submitted = false;
          this.close.emit();
        },
        error: (err: { message: any }) => {
          this.errorMessage = err.message || 'Erreur lors de l\'inscription.';
        }
      });
    }
  }


  onClose() {
    this.close.emit();
  }
  matchEmails(group: FormGroup) {
    const email = group.get('email')?.value;
    const emailConfirm = group.get('emailConfirm')?.value;
    return email === emailConfirm ? null : { emailMismatch: true };
  }

  matchPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const passConfirm = group.get('passwordConfirm')?.value;
    return pass === passConfirm ? null : { passwordMismatch: true };
  }


}
