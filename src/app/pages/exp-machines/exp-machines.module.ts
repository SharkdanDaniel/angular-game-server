import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpMachinesRoutingModule } from './exp-machines-routing.module';
import { ExpMachinesComponent } from './exp-machines.component';
import { ExpMachineUpdateComponent } from './exp-machine-update/exp-machine-update.component';
import { ExpMachinesFormComponent } from './exp-machines-form/exp-machines-form.component';


@NgModule({
  declarations: [ExpMachinesComponent, ExpMachineUpdateComponent, ExpMachinesFormComponent],
  imports: [
    CommonModule,
    ExpMachinesRoutingModule,
    SharedModule
  ]
})
export class ExpMachinesModule { }
