import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private token: TokenService) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(
      `http://hcs.dev4.com.br/api/Users/GetUsers/${this.token.getToken()}`
    );
  }
}
