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
    private router: Router
    ) {}

  server: any;

  ngOnInit(): void {
    this.server = JSON.parse(sessionStorage.getItem('server'))
  }

  logout(): void {
    this.auth.logout();
  }

  edit(): void {
    const id = JSON.parse(sessionStorage.getItem('server')).id
    this.router.navigate(['/servers/edit/', id])
  }

  switch(): void {
    this.router.navigate(['/servers'])
  }
}
