import { Routes } from '@angular/router';
import { UsersComponent } from './adminpage/users/users.component';
import { AppComponent } from './app.component';

export const routes: Routes = [

    {path: "", component: AppComponent},
    {path: "admin/users", component: UsersComponent}
];
