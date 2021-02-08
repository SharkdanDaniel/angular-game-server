import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from './snackbar.service';
import { UsersComponent } from './../../pages/users/users.component';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/shared/classes/crud-service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudService<any> {
  constructor(
    protected http: HttpClient,
    private token: TokenService,
    protected snackBar: SnackbarService,
    protected ngxSpinner: NgxSpinnerService
  ) {
    super(http, environment.API, snackBar, ngxSpinner)
    this.setAll = `Users/GetUsers/${this.token.getToken()}`;
  }

  // getUsers(): Observable<any[]> {
  //   return this.http.get<any[]>(
  //     `https://hcs.dev4.com.br/api/Users/GetUsers/${this.token.getToken()}`
  //   );
  // }

  getUsersById(id: string): Observable<any> {
    return this.http.get<any>(
      `https://hcs.dev4.com.br/api/Users/GetUser/${this.token.getToken()}/${id}`
    );
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(
      `https://hcs.dev4.com.br/api/Users/AddUser/${this.token.getToken()}`,
      user
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(
      `https://hcs.dev4.com.br/api/Users/EditUser/${this.token.getToken()}/${user.id}`,
      user
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(
      `https://hcs.dev4.com.br/api/Users/DelUser/${this.token.getToken()}/${id}`
    );
  }
}
