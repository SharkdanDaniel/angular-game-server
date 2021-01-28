import { map, take } from 'rxjs/operators';
import { LoginService } from './../services/login.service';
import { ServersService } from './../services/servers.service';
import { Router } from '@angular/router';
import { AuthGuard } from './../guards/auth.guard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  server: any;
  user: any;

  isMenuCollapsed = true;

  constructor(
    private auth: AuthGuard,
    private router: Router,
    private serverService: ServersService,
    private login: LoginService
  ) {}

  ngOnInit(): void {
    this.refreshUser();
    this.refreshServer();
  }

  ngDoCheck(): void {
    this.refreshServer();
  }

  refreshUser() {
    // this.login.getUser().pipe(take(1)).subscribe((res) => {
    //   this.user = res;
    // })
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
  }

  refreshServer(): void {
    // this.serverService.getServer().pipe(take(1)).subscribe(res => {
    //   this.server = res;
    // })
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
