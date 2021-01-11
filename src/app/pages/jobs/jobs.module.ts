import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { JobDeleteComponent } from './job-delete/job-delete.component';
import { JobUpdateComponent } from './job-update/job-update.component';


@NgModule({
  declarations: [JobsComponent, JobCreateComponent, JobDeleteComponent, JobUpdateComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule
  ]
})
export class JobsModule { }
