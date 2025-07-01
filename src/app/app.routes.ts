import { Routes } from '@angular/router';
import { UsersComponent } from './adminpage/users/users.component';
import { ListsComponent } from './adminpage/lists/lists.component';
import { ProfileComponent } from './ProfilePage/profile/profile.component';
import { HomePageComponent } from './homepage/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/lists', component: ListsComponent, },
  { path: 'profil', component: ProfileComponent },
];
