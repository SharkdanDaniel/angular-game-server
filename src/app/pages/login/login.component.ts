import { UserService } from './../../core/services/user.service';
import { LoginService } from '../../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

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
    private router: Router,
    private userService: UserService,
    private snackBar: SnackbarService
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
        (data: any) => {
          sessionStorage.setItem('user', JSON.stringify(data));
          console.table(data);
          if (data.permission < 2) {
            this.userService.getUsersById(data.id).subscribe(res => {
              sessionStorage.setItem('server', JSON.stringify(res.server))
              this.router.navigate([''])
            })
          } else {
            this.router.navigate(['/servers']);
          }
        },
        (err) => {
          if (err.status == 401) {
            this.snackBar.showMessage('Email ou senha inválido', true)
            console.log('Email ou senha incorretos');
          }
          this.snackBar.showMessage('Erro ao tentar conectar', true)
          console.log('', err);
        }
      );
  }
}
