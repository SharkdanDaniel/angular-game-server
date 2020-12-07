import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken() {
    const token = JSON.parse(sessionStorage.getItem('user')).token;
    return token;
  }
}
