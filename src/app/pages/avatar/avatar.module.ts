import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarRoutingModule } from './avatar-routing.module';
import { AvatarComponent } from './avatar.component';
import { AvatarUpdateComponent } from './avatar-update/avatar-update.component';


@NgModule({
  declarations: [AvatarComponent, AvatarUpdateComponent],
  imports: [
    CommonModule,
    AvatarRoutingModule,
    SharedModule
  ]
})
export class AvatarModule { }
