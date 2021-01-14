import { UserService } from './../../core/services/user.service';
import { LoginService } from '../../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private snackBar: SnackbarService,
    private spinner: SpinnerService,
    private ngxSpinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // this.ngxSpinner.show()
    this.form = this.formBuilder.group({
      email: [null],
      password: [null],
    });
  }

  onSubmit() {
    this.spinner.set(true);
    this.login
      .postLogin(this.form.value)
      .pipe(take(1))
      .subscribe(
        (data: any) => {
          sessionStorage.setItem('user', JSON.stringify(data));
          console.table(data);
          if (data.permission < 2) {
            this.spinner.set(false);
            this.userService.getUsersById(data.id).subscribe(res => {
              sessionStorage.setItem('server', JSON.stringify(res.server))
              this.router.navigate([''])
            })
          } else {
            this.spinner.set(false);
            this.router.navigate(['/servers']);
          }
        },
        (err) => {
          if (err.status == 401) {
            this.snackBar.showMessage('Email ou senha inválido', true)
            console.log('Email ou senha incorretos');
            this.spinner.set(false);
          } else {
            console.log('', err);
            this.snackBar.showMessage('Erro ao tentar conectar', true)
            this.spinner.set(false);
          }
        }
      );
  }
}
