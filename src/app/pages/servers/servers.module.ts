import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServersRoutingModule } from './servers-routing.module';
import { ServersComponent } from './servers.component';
import { ServerProfileComponent } from './server-profile/server-profile.component';


@NgModule({
  declarations: [ServersComponent, ServerProfileComponent],
  imports: [
    CommonModule,
    ServersRoutingModule,
    SharedModule
  ]
})
export class ServersModule { }
