import { Routes } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UsersComponent } from './adminpage/users/users.component';
import { ProfileComponent } from './ProfilePage/profile/profile.component';
import { StatsComponent } from './adminpage/stats/stats.component';
import { HomePageComponent } from './auth/home-page/home-page.component';
import { ListDetailComponent } from './ListsPage/list-detail/list-detail.component';
import { ListPreviewComponent } from './ListsPage/list-preview/list-preview.component';
import { ListsUserComponent } from './ListsPage/lists/lists.component';
import { MentionsLegalesComponent } from './legal/mentions-legales/mentions-legales.component';
import { AuthenticatedLayoutComponent } from './layout/authenticated-layout/authenticated-layout.component';
import { GroupPageComponent } from './Groups/group-page/group-page.component';
import { DrawHistoryComponent } from './DrawHistory/draw-history/draw-history.component';


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
    { path: 'profil', component: ProfileComponent },
      { path: 'admin/users', component: UsersComponent },
     {
    path: 'admin/stats', component: StatsComponent
  },
  {
    path: 'lists/:id',
    component: ListDetailComponent,
  },
  { path: 'list-preview/:id', component: ListPreviewComponent },
  { path: 'sidebar', component: SidebarComponent },
    { path: 'legal', component: MentionsLegalesComponent },
    {
    path: 'groups',
    component: GroupPageComponent
  },
    { path: 'draw-history', component: DrawHistoryComponent }

  ]
}
];
