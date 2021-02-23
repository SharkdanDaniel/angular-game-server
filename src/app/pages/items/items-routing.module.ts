import { ItemFormComponent } from './item-form/item-form.component';
import { ItemDeleteComponent } from './item-delete/item-delete.component';
import { ItemUpdateComponent } from './item-update/item-update.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsComponent } from './items.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent
  },
  {
    path: 'create',
    component: ItemFormComponent
  },
  {
    path: 'update/:id',
    component: ItemFormComponent
  },
  // {
  //   path: 'delete/:id',
  //   component: ItemDeleteComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
