import { take } from 'rxjs/operators';
import { LoginService } from './../../core/services/login.service';
import { ServersService } from './../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any;
  server: any;

  constructor(
    private serverService: ServersService,
    private login: LoginService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    // this.login.getUser().pipe(take(1)).subscribe((res: any) => {
    //   console.log('home user')
    //   this.user = res;
    // }),
    // (err) => {
    //   console.log(err)
    // }
    // this.serverService.getServer().pipe(take(1)).subscribe((res: any) => {
    //   console.log('home server')
    //   this.server = res;
    // }),
    // (err) => {
    //   console.log(err)
    // }
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }

    if (localStorage.getItem('server')) {
      this.server = JSON.parse(localStorage.getItem('server'));
    } else {
      this.server = JSON.parse(sessionStorage.getItem('server'));
    }
  }

  ngDoCheck(): void {
    this.refresh();
  }
}
