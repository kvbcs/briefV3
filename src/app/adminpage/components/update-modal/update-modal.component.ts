import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Users } from '../../../../model/types';
import { UsersService } from '../../services/users.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css',
})
export class UpdateModalComponent implements OnChanges {
  private userService = inject(UsersService);
  private formBuilder = inject(FormBuilder);
  @Input() showModal: boolean = false;
  @Input() userId!: number | null;
  @Output() close = new EventEmitter<void>();

  updateForm: FormGroup = this.formBuilder.group({
    firstName: new FormControl('', [Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.minLength(3)]),
    email: new FormControl('', [Validators.email]),
  });

  user = signal<Users | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId !== null) {
      const existingUser = this.userService.getUserByIdSignal(this.userId);
      if (existingUser) {
        this.user.set(existingUser);
        this.updateForm.patchValue({
          firstName: existingUser.firstname,
          lastName: existingUser.lastname,
          email: existingUser.email,
        });
      }
      this.user.set(existingUser);
    }
  }
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    if (this.user()) {
      this.updateForm.reset({
        firstName: this.user()?.firstname,
        lastName: this.user()?.lastname,
        email: this.user()?.email,
      });
    }
    this.close.emit();
  }

  onSubmit(): void {
    if (this.updateForm.pristine) {
      alert('rien changé');
      this.closeModal();
    } else if (this.updateForm.valid) {
      const updatedUser = { ...this.updateForm.value };
      alert('Utilisateur mis à jour');
      console.log(updatedUser);

      this.closeModal();
    }
  }
}
