import { LoginService } from './../../core/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(private login: LoginService) {}

  ngOnInit(): void {}

  save(user) {
    this.login.postLogin(user).subscribe(
      (data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        console.table(data);
      },
      (err) => {
        console.error('', err);
      }
    );
  }
}
