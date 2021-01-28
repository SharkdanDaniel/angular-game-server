import { EventEmitter, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  showHeader = new BehaviorSubject<boolean>(false);

  get isShowHeader() {
    return this.showHeader.asObservable();
  }

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
      sessionStorage.getItem('server') ||
      localStorage.getItem('user') &&
      localStorage.getItem('server')
    ) {
      this.showHeader.next(true);
      return true;
    }
    this.showHeader.next(false);
    this.router.navigate(['/login']);
    return false;
  }

  logout(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    } else {
      sessionStorage.removeItem('user');
    }

    if (localStorage.getItem('server')) {
      localStorage.removeItem('server');
    } else {
      sessionStorage.removeItem('server');
    }

    this.showHeader.next(false);
    this.router.navigate(['/login']);
  }
}
