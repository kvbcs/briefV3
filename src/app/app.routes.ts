import { Routes } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UsersComponent } from './adminpage/users/users.component';
import { AppComponent } from './app.component';
import { ListsComponent } from './adminpage/lists/lists.component';
import { ProfilComponent } from './ProfilePage/profile/profile.component';
import { StatsComponent } from './adminpage/stats/stats.component';
import { HomePageComponent } from './homepage/pages/home-page/home-page.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListPreviewComponent } from './list-preview/list-preview.component';
import { ListsUserComponent } from './lists/lists.component';
import { MentionsLegalesComponent } from './legal/mentions-legales/mentions-legales.component';



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
    { path: 'lists', component: ListsUserComponent },
  {
    path: 'lists/:id',
    component: ListDetailComponent,
  },
  { path: 'list-preview/:id', component: ListPreviewComponent },
  { path: 'sidebar', component: SidebarComponent },
    { path: 'legal', component: MentionsLegalesComponent },
];
