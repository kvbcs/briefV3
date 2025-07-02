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
import { User } from '../../../../models/user.model';
import { UsersService } from '../../../services/users.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-users.component.html',
  styleUrl: './update-users.component.css',
})
export class UpdateUsersComponent implements OnChanges {
  constructor(private toast: ToastrService) {}
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

  user = signal<User | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId !== null) {
      const existingUser = this.userService.getUserByIdSignal(this.userId);
      if (existingUser) {
        this.user.set(existingUser);
        this.updateForm.patchValue({
          firstName: existingUser.first_name,
          lastName: existingUser.last_name,
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
        firstName: this.user()?.first_name,
        lastName: this.user()?.last_name,
        email: this.user()?.email,
      });
    }
    this.close.emit();
  }

  onSubmit(): void {
    if (this.updateForm.pristine) {
      this.toast.info('Aucune modification effectuée', 'Info');
      this.closeModal();
    } else if (this.updateForm.valid) {
      const updatedUser = { ...this.updateForm.value };
      this.toast.success('Utilisateur mis à jour', 'Succès');
      console.log(updatedUser);

      this.closeModal();
    }
  }
}
