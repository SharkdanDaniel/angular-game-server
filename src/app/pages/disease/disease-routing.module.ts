import { DiseaseDeleteComponent } from './disease-delete/disease-delete.component';
import { DiseaseUpdateComponent } from './disease-update/disease-update.component';
import { DiseaseCreateComponent } from './disease-create/disease-create.component';
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
    component: DiseaseCreateComponent,
  },
  {
    path: 'update/:id',
    component: DiseaseUpdateComponent,
  },
  {
    path: 'delete/:id',
    component: DiseaseDeleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiseaseRoutingModule {}
