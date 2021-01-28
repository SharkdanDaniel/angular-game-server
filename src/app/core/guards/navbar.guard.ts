import { NavbarService } from './../services/navbar.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarGuard implements CanActivate {
  constructor(private navbar: NavbarService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log()
      if (
        state.url == '/servers' ||
        state.url == '/login'
      ) {
        this.navbar.showHeaderTrue(false);
      } else {
        this.navbar.showHeaderTrue(true);
      }
      console.log(this.navbar.ShowHeaderValue)
    return true;
  }
}
