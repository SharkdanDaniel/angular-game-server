import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseaseRoutingModule } from './disease-routing.module';
import { DiseaseComponent } from './disease.component';
import { DiseaseFormComponent } from './disease-form/disease-form.component';


@NgModule({
  declarations: [DiseaseComponent, DiseaseFormComponent],
  imports: [
    CommonModule,
    DiseaseRoutingModule,
    SharedModule
  ]
})
export class DiseaseModule { }
