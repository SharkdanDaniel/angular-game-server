import { Observable } from 'rxjs';
import { NavbarService } from './core/services/navbar.service';
import { AuthGuard } from './core/guards/auth.guard';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isCollapsed = window.innerWidth < 989 ? true : false;
  }

  title = 'GameAutoBem';
  server: any;
  user: any;

  isCollapsed = false;
  showHeader$: Observable<boolean>;

  constructor(private auth: AuthGuard, private navbar: NavbarService) {}

  ngOnInit(): void {
    this.showHeader$ = this.navbar.isShowHeader;
    this.refreshUser();
    this.refreshServer();
  }

  ngDoCheck(): void {  
    this.refreshServer();
  }

  refreshUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
  }

  refreshServer(): void {
    if (localStorage.getItem('server')) {
      this.server = JSON.parse(localStorage.getItem('server'));
    } else {
      this.server = JSON.parse(sessionStorage.getItem('server'));
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
