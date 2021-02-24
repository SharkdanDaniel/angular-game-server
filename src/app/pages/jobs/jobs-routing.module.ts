import { JobFormComponent } from './job-form/job-form.component';
import { JobUpdateComponent } from './job-update/job-update.component';
import { JobDeleteComponent } from './job-delete/job-delete.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsComponent } from './jobs.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent
  },
  {
    path: 'create',
    component: JobFormComponent
  },  
  {
    path: 'update/:id',
    component: JobFormComponent
  },
  // {
  //   path: 'delete/:id',
  //   component: JobDeleteComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
