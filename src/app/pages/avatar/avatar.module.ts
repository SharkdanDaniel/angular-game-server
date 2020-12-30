import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarRoutingModule } from './avatar-routing.module';
import { AvatarComponent } from './avatar.component';
import { AvatarUpdateComponent } from './avatar-update/avatar-update.component';
import { AvatarBanComponent } from './avatar-ban/avatar-ban.component';
import { AvatarUnbanComponent } from './avatar-unban/avatar-unban.component';


@NgModule({
  declarations: [AvatarComponent, AvatarUpdateComponent, AvatarBanComponent, AvatarUnbanComponent],
  imports: [
    CommonModule,
    AvatarRoutingModule,
    SharedModule
  ]
})
export class AvatarModule { }
