import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseaseRoutingModule } from './disease-routing.module';
import { DiseaseComponent } from './disease.component';


@NgModule({
  declarations: [DiseaseComponent],
  imports: [
    CommonModule,
    DiseaseRoutingModule,
    SharedModule
  ]
})
export class DiseaseModule { }
