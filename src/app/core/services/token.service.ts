import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken() {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = JSON.parse(sessionStorage.getItem('user')).token;
    }
    return token;
  }
}
