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

  getUsers(): Observable<any[]> {
    return this.http
      .get<any[]>(
        `https://hcs.dev4.com.br/api/Users/GetUsers/${this.token.getToken()}`
      )
      .pipe(take(1));
  }

  getUsersById(id: string): Observable<any> {
    return this.http.get<any>(
      `https://hcs.dev4.com.br/api/Users/GetUser/${this.token.getToken()}/${id}`
    )
    .pipe(take(1));
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(
      `https://hcs.dev4.com.br/api/Users/AddUser/${this.token.getToken()}`,
      user
    )
    .pipe(take(1));
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(
      `https://hcs.dev4.com.br/api/Users/EditUser/${this.token.getToken()}/${
        user.id
      }`,
      user
    )
    .pipe(take(1));
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(
      `https://hcs.dev4.com.br/api/Users/DelUser/${this.token.getToken()}/${id}`
    );
  }
}
