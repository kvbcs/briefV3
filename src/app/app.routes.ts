import { Routes } from '@angular/router';
import { UsersComponent } from './adminpage/users/users.component';
import { AppComponent } from './app.component';
import { ListsComponent } from './adminpage/lists/lists.component';
import { ProfilComponent } from './ProfilePage/profile/profile.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'admin/users', component: UsersComponent },
  {
    path: 'admin/lists',
    component: ListsComponent,
  },
  { path: 'profil', component: ProfilComponent },
];
