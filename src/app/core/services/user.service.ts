import { User } from './../models/user';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private token: TokenService
  ) // private usersComponent: UsersComponent
  {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(
        `https://hcs.dev4.com.br/api/Users/GetUsers/${this.token.getToken()}`
      )
      .pipe(take(1));
  }

  getUsersById(id: string): Observable<User> {
    return this.http.get<User>(
      `https://hcs.dev4.com.br/api/Users/GetUser/${this.token.getToken()}/${id}`
    )
    .pipe(take(1));
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      `https://hcs.dev4.com.br/api/Users/AddUser/${this.token.getToken()}`,
      user
    )
    .pipe(take(1));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `https://hcs.dev4.com.br/api/Users/EditUser/${this.token.getToken()}/${
        user.id
      }`,
      user
    )
    .pipe(take(1));
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(
      `https://hcs.dev4.com.br/api/Users/DelUser/${this.token.getToken()}/${id}`
    )
    .pipe(take(1));
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
}
