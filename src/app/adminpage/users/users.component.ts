import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UpdateModalComponent } from '../components/update-modal/update-modal.component';

@Component({
  selector: 'app-users',
  imports: [UpdateModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private userService = inject(UsersService);
  users = this.userService.getUsersSignal();
  modalOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users.set(data);
    });
  }
  openModal() {
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
  }
}
