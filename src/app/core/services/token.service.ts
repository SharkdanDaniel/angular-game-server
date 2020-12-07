import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = user.token;
    return token;
  }
}
