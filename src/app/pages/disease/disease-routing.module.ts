import { DiseaseFormComponent } from './disease-form/disease-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiseaseComponent } from './disease.component';

const routes: Routes = [
  {
    path: '',
    component: DiseaseComponent,
  },
  {
    path: 'create',
    component: DiseaseFormComponent,
  },
  {
    path: 'update/:id',
    component: DiseaseFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiseaseRoutingModule {}
