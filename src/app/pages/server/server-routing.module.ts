import { ServerFormComponent } from './server-form/server-form.component';
import { ParcelFormComponent } from './parcels/parcel-form/parcel-form.component';
import { ExpTableFormComponent } from './exp-table/exp-table-form/exp-table-form.component';
import { AuthGuard } from './../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerCreateComponent } from './server-create/server-create.component';
import { ServerProfileComponent } from './server-profile/server-profile.component';
import { ExpTableComponent } from './exp-table/exp-table.component';
import { AvailableItemsComponent } from './available-items/available-items.component';
import { AvailableItemsCreateComponent } from './available-items/available-items-create/available-items-create.component';
import { AvailableItemsDeleteComponent } from './available-items/available-items-delete/available-items-delete.component';
import { AvailableItemsUpdateComponent } from './available-items/available-items-update/available-items-update.component';
import { ParcelsComponent } from './parcels/parcels.component';

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
    component: ServerFormComponent,
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
    component: ParcelFormComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/parcels/edit/:pid',
    component: ParcelFormComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerRoutingModule { }
