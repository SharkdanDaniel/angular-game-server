import { LoginService } from '../../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private login: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null],
      password: [null],
    });
  }

  onSubmit() {
    this.login
      .postLogin(this.form.value)
      .pipe(take(1))
      .subscribe(
        (data) => {
          sessionStorage.setItem('user', JSON.stringify(data));
          console.table(data);
          this.router.navigate(['']);
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
