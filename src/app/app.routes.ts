import { Routes } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UsersComponent } from './adminpage/users/users.component';
import { ProfilComponent } from './ProfilePage/profile/profile.component';
import { StatsComponent } from './adminpage/stats/stats.component';
import { HomePageComponent } from './homepage/pages/home-page/home-page.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListPreviewComponent } from './list-preview/list-preview.component';
import { ListsUserComponent } from './lists/lists.component';
import { MentionsLegalesComponent } from './legal/mentions-legales/mentions-legales.component';
import { AuthenticatedLayoutComponent } from './layout/authenticated-layout/authenticated-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },

  {
    path: '',
    component: AuthenticatedLayoutComponent,
    children: [
      { path: 'lists', component: ListsUserComponent },
      // { path: 'groupes', component: GroupsComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'admin/users', component: UsersComponent },

      {
        path: 'admin/stats',
        component: StatsComponent,
      },
      {
        path: 'lists/:id',
        component: ListDetailComponent,
      },
      { path: 'list-preview/:id', component: ListPreviewComponent },
      { path: 'sidebar', component: SidebarComponent },
      { path: 'legal', component: MentionsLegalesComponent },
    ],
  },
];
