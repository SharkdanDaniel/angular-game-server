import { AvatarUpdateComponent } from './avatar-update/avatar-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarComponent } from './avatar.component';

const routes: Routes = [
  {
    path: '',
    component: AvatarComponent,
  },
  {
    path: 'update/:id',
    component: AvatarUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarRoutingModule {}
