import { Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListPreviewComponent } from './list-preview/list-preview.component';


export const routes: Routes = [
  { path: 'lists', component: ListsComponent },
  {
    path: 'lists/:id',
    component: ListDetailComponent,
  },
  { path: 'list-preview/:id', component: ListPreviewComponent },
  { path: '**', redirectTo: '' },
];
