import { ExpTableUpdateComponent } from './exp-table/exp-table-update/exp-table-update.component';
import { ExpTableComponent } from './exp-table/exp-table.component';
import { ServerCreateComponent } from './server-create/server-create.component';
import { ServerUpdateComponent } from './server-update/server-update.component';
import { AuthGuard } from './../../core/guards/auth.guard';
import { ServerProfileComponent } from './server-profile/server-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServersComponent } from './servers.component';

const routes: Routes = [
  { path: '',
    component: ServersComponent
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
  { path: ':id/exptable/edit/:expid',
    component: ExpTableUpdateComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServersRoutingModule { }
