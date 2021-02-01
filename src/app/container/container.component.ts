import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavbarService } from './../core/services/navbar.service';
import { AuthGuard } from './../core/guards/auth.guard';
import { Observable } from 'rxjs';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isCollapsed = window.innerWidth < 989 ? true : false;
  }

  title = 'GameAutoBem';
  server: any;
  user: any;

  isCollapsed = false;
  showHeader$: Observable<boolean>;

  constructor(
    private auth: AuthGuard,
    private navbar: NavbarService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

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

  setHome() {
    this.spinner.show('content')
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 200);
  }

  logout(): void {
    this.auth.logout();
  }

}
