import { EventEmitter, Injectable } from '@angular/core';
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
export class AuthGuard implements CanActivate {
  showHeader = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      sessionStorage.getItem('user') &&
      sessionStorage.getItem('server')
    ) {
      this.showHeader.emit(true);
      return true;
    }
    this.showHeader.emit(false);
    this.router.navigate(['/login']);
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('server');
    this.showHeader.emit(false);
    this.router.navigate(['/login']);
  }
}
