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
  constructor(
    private auth: AuthGuard,
    private router: Router,
    private serverService: ServersService
    ) {}

  server: any;

  ngOnInit(): void {
    this.refreshServer();
  }

  ngDoCheck(): void {
    this.refreshServer();
  }

  refreshServer(): void {
    this.server = JSON.parse(sessionStorage.getItem('server'))
  }

  logout(): void {
    this.auth.logout();
  }

}
