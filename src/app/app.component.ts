import { AuthGuard } from './core/guards/auth.guard';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GameAutoBem';
  server: any;
  user: any;

  isCollapsed = false;

  showHeader: boolean = false;

  constructor(private auth: AuthGuard) {}

  ngOnInit(): void {
    this.auth.showHeader.subscribe((show) => (this.showHeader = show));
    this.refreshUser();
    this.refreshServer();
  }

  ngDoCheck(): void {
    this.refreshServer();
    this.auth.showHeader.subscribe((show) => (this.showHeader = show));
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
