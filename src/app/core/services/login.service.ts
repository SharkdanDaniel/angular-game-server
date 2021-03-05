import { User } from './../models/user';
import { Server } from './../models/server';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly apiURL = environment.API+'login/login';

  constructor(private http: HttpClient) {}

  postLogin(login) {
    return this.http.post(`${this.apiURL}`, login).pipe(take(1));
  }

  getUser() {
    let user: User;
    if (localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user'));
    } else {
      user = JSON.parse(sessionStorage.getItem('user'));
    }
    return user;
  }

  getServer() {
    let server: Server;
    if (localStorage.getItem('server')) {
      server = JSON.parse(localStorage.getItem('server'));
    } else {
      server = JSON.parse(sessionStorage.getItem('server'));
    }
    return server;
  }
}
