import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'view-user', component: ViewUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
