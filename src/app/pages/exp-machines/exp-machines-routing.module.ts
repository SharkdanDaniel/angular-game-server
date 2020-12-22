import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpMachinesComponent } from './exp-machines.component';

const routes: Routes = [{ path: '', component: ExpMachinesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpMachinesRoutingModule { }
