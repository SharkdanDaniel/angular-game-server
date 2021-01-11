import { map } from 'rxjs/operators';
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
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  refreshServer(): void {
    this.server = JSON.parse(sessionStorage.getItem('server'));
  }

  logout(): void {
    this.auth.logout();
  }
}
