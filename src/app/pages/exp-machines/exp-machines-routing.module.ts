import { ExpMachinesFormComponent } from './exp-machines-form/exp-machines-form.component';
import { ExpMachineUpdateComponent } from './exp-machine-update/exp-machine-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpMachinesComponent } from './exp-machines.component';

const routes: Routes = [
  {
    path: '',
    component: ExpMachinesComponent,
  },
  {
    path: 'update',
    component: ExpMachinesFormComponent,
  },
  // {
  //   path: 'update/:id',
  //   component: ExpMachineUpdateComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpMachinesRoutingModule {}
