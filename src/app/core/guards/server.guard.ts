import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (sessionStorage.getItem('user')) {
      if (JSON.parse(sessionStorage.getItem('user')).permission < 2) {
        this.router.navigate(['']);
        return false;
      }
    } else if (localStorage.getItem('user')) {
      if (JSON.parse(localStorage.getItem('user')).permission < 2) {
        this.router.navigate(['']);
        return false;
      }
    }
    return true;
  }
}
