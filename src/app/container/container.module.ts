import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { ContainerComponent } from './container.component';


@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    CoreModule,
    NgxSpinnerModule
  ],
  exports: [
    ContainerComponent
  ]
})
export class ContainerModule { }
