import { ExpTableFormComponent } from './exp-table/exp-table-form/exp-table-form.component';
import { AuthGuard } from './../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerComponent } from './server.component';
import { ServerCreateComponent } from './server-create/server-create.component';
import { ServerProfileComponent } from './server-profile/server-profile.component';
import { ServerUpdateComponent } from './server-update/server-update.component';
import { ExpTableComponent } from './exp-table/exp-table.component';
import { ExpTableCreateComponent } from './exp-table/exp-table-create/exp-table-create.component';
import { ExpTableUpdateComponent } from './exp-table/exp-table-update/exp-table-update.component';
import { ExpTableDeleteComponent } from './exp-table/exp-table-delete/exp-table-delete.component';
import { AvailableItemsComponent } from './available-items/available-items.component';
import { AvailableItemsCreateComponent } from './available-items/available-items-create/available-items-create.component';
import { AvailableItemsDeleteComponent } from './available-items/available-items-delete/available-items-delete.component';
import { AvailableItemsUpdateComponent } from './available-items/available-items-update/available-items-update.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { ParcelsCreateComponent } from './parcels/parcels-create/parcels-create.component';
import { ParcelsDeleteComponent } from './parcels/parcels-delete/parcels-delete.component';
import { ParcelsUpdateComponent } from './parcels/parcels-update/parcels-update.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
  // { 
  //   path: '', component: ServerComponent 
  // },
  { path: 'create',
    component: ServerCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'profile/:id',
    component: ServerProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'edit/:id',
    component: ServerUpdateComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/exptable',
    component: ExpTableComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/exptable/create',
    component: ExpTableFormComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/exptable/edit/:expid',
    component: ExpTableFormComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/exptable/delete/:expid',
    component: ExpTableDeleteComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/availableitems',
    component: AvailableItemsComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/availableitems/create',
    component: AvailableItemsCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/availableitems/delete/:itid',
    component: AvailableItemsDeleteComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/availableitems/edit/:itid',
    component: AvailableItemsUpdateComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/parcels',
    component: ParcelsComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/parcels/create',
    component: ParcelsCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/parcels/delete/:pid',
    component: ParcelsDeleteComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/parcels/edit/:pid',
    component: ParcelsUpdateComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerRoutingModule { }
