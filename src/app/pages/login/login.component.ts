import { LoginService } from './../../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private login: LoginService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null],
      password: [null],
    });
  }

  onSubmit() {
    this.login.postLogin(this.form.value).subscribe(
      (data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        console.table(data);
      },
      (err) => {
        if (err.status == 401) {
          console.log('Email ou senha incorretos');
        }
        console.log('', err);
      }
    );
  }
}
