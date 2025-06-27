import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private userService = inject(UsersService);
  users = this.userService.getUsersSignal()

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users.set(data);
    });
  }
}
