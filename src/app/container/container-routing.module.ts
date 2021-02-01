import { NavbarGuard } from './../core/guards/navbar.guard';
import { AuthGuard } from './../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { 
    path: '', 
    component: ContainerComponent 
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../pages/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard, NavbarGuard],
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('../pages/jobs/jobs.module').then((m) => m.JobsModule),
    canActivate: [AuthGuard, NavbarGuard],
  },
  {
    path: 'items',
    loadChildren: () =>
      import('../pages/items/items.module').then((m) => m.ItemsModule),
    canActivate: [AuthGuard, NavbarGuard],
  },
  {
    path: 'exp-machines',
    loadChildren: () =>
      import('../pages/exp-machines/exp-machines.module').then(
        (m) => m.ExpMachinesModule
      ),
    canActivate: [AuthGuard, NavbarGuard],
  },
  {
    path: 'disease',
    loadChildren: () =>
      import('../pages/disease/disease.module').then((m) => m.DiseaseModule),
    canActivate: [AuthGuard, NavbarGuard],
  },
  {
    path: 'avatar',
    loadChildren: () =>
      import('../pages/avatar/avatar.module').then((m) => m.AvatarModule),
    canActivate: [AuthGuard, NavbarGuard],
  },
  {
    path: 'servers',
    loadChildren: () =>
      import('../pages/servers/servers.module').then((m) => m.ServersModule),
    canActivate: [NavbarGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard, NavbarGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainerRoutingModule {}
