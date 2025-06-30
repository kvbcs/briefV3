import { Routes } from '@angular/router';

import { UsersComponent } from './adminpage/users/users.component';
import { AppComponent } from './app.component';
import { ListsComponent } from './adminpage/lists/lists.component';
import { ProfilComponent } from './ProfilePage/profile/profile.component';
import { StatsComponent } from './adminpage/stats/stats.component';
import { HomePageComponent } from './homepage/pages/home-page/home-page.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListPreviewComponent } from './list-preview/list-preview.component';

export const routes: Routes = [
    {
    path: '',
    component: HomePageComponent
  },
  { path: 'admin/users', component: UsersComponent },
  {
    path: 'admin/lists',
    component: ListsComponent,
  }, {
    path: 'admin/stats', component: StatsComponent
  },
  { path: 'profil', component: ProfilComponent },
    { path: 'lists', component: ListsComponent },
  {
    path: 'lists/:id',
    component: ListDetailComponent,
  },
  { path: 'list-preview/:id', component: ListPreviewComponent },

];
