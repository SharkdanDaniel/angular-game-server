import { ServerProfileComponent } from './server-profile/server-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServersComponent } from './servers.component';

const routes: Routes = [
  { path: '',
    component: ServersComponent
  },
  { path: '/profile/:id',
    component: ServerProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServersRoutingModule { }
