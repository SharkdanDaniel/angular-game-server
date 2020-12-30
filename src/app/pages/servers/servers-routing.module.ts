import { ServerGuard } from './../../core/guards/server.guard';
import { ParcelsUpdateComponent } from './parcels/parcels-update/parcels-update.component';
import { ParcelsCreateComponent } from './parcels/parcels-create/parcels-create.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { AvailableItemsUpdateComponent } from './available-items/available-items-update/available-items-update.component';
import { AvailableItemsDeleteComponent } from './available-items/available-items-delete/available-items-delete.component';
import { AvailableItemsCreateComponent } from './available-items/available-items-create/available-items-create.component';
import { AvailableItemsComponent } from './available-items/available-items.component';
import { ExpTableDeleteComponent } from './exp-table/exp-table-delete/exp-table-delete.component';
import { ExpTableCreateComponent } from './exp-table/exp-table-create/exp-table-create.component';
import { ExpTableUpdateComponent } from './exp-table/exp-table-update/exp-table-update.component';
import { ExpTableComponent } from './exp-table/exp-table.component';
import { ServerCreateComponent } from './server-create/server-create.component';
import { ServerUpdateComponent } from './server-update/server-update.component';
import { AuthGuard } from './../../core/guards/auth.guard';
import { ServerProfileComponent } from './server-profile/server-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServersComponent } from './servers.component';
import { ParcelsDeleteComponent } from './parcels/parcels-delete/parcels-delete.component';

const routes: Routes = [
  { path: '',
    component: ServersComponent,
    canActivate: [ServerGuard],
  },
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
    component: ExpTableCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id/exptable/edit/:expid',
    component: ExpTableUpdateComponent,
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
export class ServersRoutingModule { }
