import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private toastr: ToastrService ) {}

  private userService = inject(UsersService);

  users = signal<User[]>([]);


  ngOnInit(): void {
    try {
      this.userService.getUsers().subscribe((data) => {
        this.users.set(data);
        console.log(data);

        this.toastr.success('Utilisateurs chargés', 'Succès');
      });
    } catch (error) {
      this.toastr.error('Erreur serveur', 'Erreur');
      console.log(error);
    }
  }

  blockUser(user: User){
    console.log(user);
    
  }
}
