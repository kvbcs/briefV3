import { Component, inject, OnInit, signal } from '@angular/core';
import { Users } from '../../../model/types';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private http = inject(HttpClient);
  users = signal<Users[]>([]);

  ngOnInit() {
    this.http.get<Users[]>('/assets/users.json').subscribe((data) => {
      console.log(data);
      this.users.set(data);
    });
  }
}
