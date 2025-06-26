import { Routes } from '@angular/router';
import { ProfilComponent } from './ProfilePage/profile/profile.component';

export const routes: Routes = [
  { path: 'profil', component: ProfilComponent },
  { path: '', redirectTo: 'profil', pathMatch: 'full' }, // temporaire pour tester
];
