import { AvatarUnbanComponent } from './avatar-unban/avatar-unban.component';
import { AvatarBanComponent } from './avatar-ban/avatar-ban.component';
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
  {
    path: 'ban/:id',
    component: AvatarBanComponent,
  },
  {
    path: 'unban/:id',
    component: AvatarUnbanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarRoutingModule {}
