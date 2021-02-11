import { UserFormComponent } from './user-form/user-form.component';
import { FormGuard } from './../../core/guards/form.guard';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'create',
    component: UserFormComponent,
    canDeactivate: [FormGuard]
  },
  {
    path: 'update/:id',
    component: UserFormComponent,
    canDeactivate: [FormGuard]
  },
  // {
  //   path: 'delete/:id',
  //   component: UserDeleteComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
