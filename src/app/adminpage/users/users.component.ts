import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
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
  selectedUserId = signal<number | null>(null);
  @ViewChild('id') div!: ElementRef;
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users.set(data);
    });
  }
  openModal(id: number) {
    this.selectedUserId.set(id)
    
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
  }
}
