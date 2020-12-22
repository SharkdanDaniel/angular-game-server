import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpMachinesRoutingModule } from './exp-machines-routing.module';
import { ExpMachinesComponent } from './exp-machines.component';


@NgModule({
  declarations: [ExpMachinesComponent],
  imports: [
    CommonModule,
    ExpMachinesRoutingModule,
    SharedModule
  ]
})
export class ExpMachinesModule { }
