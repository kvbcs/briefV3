import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { UsersService } from '../services/users.service';
import { UpdateUsersComponent } from '../components/modal/update-users/update-users.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  imports: [UpdateUsersComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  private userService = inject(UsersService);
  users = this.userService.getUsersSignal();
  modalOpen = signal<boolean>(false);
  selectedUserId = signal<number | null>(null);
  @ViewChild('id') div!: ElementRef;
  ngOnInit(): void {
    try {
      this.userService.getUsers().subscribe((data) => {
        this.users.set(data);
        this.toastr.success('Utilisateurs chargés', 'Succès');
      });
    } catch (error) {
      this.toastr.error("Erreur serveur", "Erreur")
      console.log(error);
      
    }
  }
  openModal(id: number) {
    this.selectedUserId.set(id);

    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
  }
}
