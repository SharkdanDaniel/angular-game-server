import { ServerGuard } from './../../core/guards/server.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServersComponent } from './servers.component';

const routes: Routes = [
  { path: '',
    component: ServersComponent,
    canActivate: [ServerGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServersRoutingModule { }
