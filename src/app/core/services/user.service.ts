import { UsersComponent } from './../../pages/users/users.component';
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
    private token: TokenService,
    // private usersComponent: UsersComponent
  ) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(
      `http://hcs.dev4.com.br/api/Users/GetUsers/${this.token.getToken()}`
    );
  }

  getUsersById(id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `http://hcs.dev4.com.br/api/Users/GetUsers/${this.token.getToken()}/${id}`
    );
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(
      `http://hcs.dev4.com.br/api/Users/AddUser/${this.token.getToken()}`,
      user
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(
      `http://hcs.dev4.com.br/api/Users/EditUser/${this.token.getToken()}/${user.id}`,
      user
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(
      `http://hcs.dev4.com.br/api/Users/DelUser/${this.token.getToken()}/${id}`
    );
  }
}
