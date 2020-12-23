import { AuthGuard } from './core/guards/auth.guard';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'servers',
    loadChildren: () =>
      import('./pages/servers/servers.module').then((m) => m.ServersModule),
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./pages/jobs/jobs.module').then((m) => m.JobsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'items',
    loadChildren: () =>
      import('./pages/items/items.module').then((m) => m.ItemsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'exp-machines',
    loadChildren: () =>
      import('./pages/exp-machines/exp-machines.module').then(
        (m) => m.ExpMachinesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'disease',
    loadChildren: () =>
      import('./pages/disease/disease.module').then((m) => m.DiseaseModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'avatar',
    loadChildren: () =>
      import('./pages/avatar/avatar.module').then((m) => m.AvatarModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
