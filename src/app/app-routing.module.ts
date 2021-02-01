import { NavbarGuard } from './core/guards/navbar.guard';
import { ServerGuard } from './core/guards/server.guard';
import { AccessGuard } from './core/guards/access.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [AccessGuard, NavbarGuard],
  },
  {
    path: 'servers',
    loadChildren: () =>
      import('./pages/servers/servers.module').then((m) => m.ServersModule),
    canActivate: [NavbarGuard],
  },  
  {
    path: '',
    loadChildren: () =>
      import('./container/container.module').then((m) => m.ContainerModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
