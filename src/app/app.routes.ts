import { Routes } from '@angular/router';
import { GroupPageComponent } from './Groups/group-page/group-page.component';

export const routes: Routes = [
  // ... autres routes
  {
    path: 'groups',
    component: GroupPageComponent
  }
];
