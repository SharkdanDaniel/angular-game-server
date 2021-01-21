import { UserService } from './../../core/services/user.service';
import { LoginService } from '../../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseForm } from 'src/app/shared/class/base-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseForm implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private login: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: SnackbarService,
    private spinner: SpinnerService,
    private ngxSpinner: NgxSpinnerService
  ) {
    super()
  }

  ngOnInit(): void {
    // this.ngxSpinner.show()
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remidme: [false],
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      const remidme = this.form.get('remidme').value;
      this.ngxSpinner.show();
      this.login
        .postLogin(this.form.value)
        .pipe(take(1))
        .subscribe(
          (data: any) => {
            if (remidme) {
              localStorage.setItem('user', JSON.stringify(data));
            } else {
              sessionStorage.setItem('user', JSON.stringify(data));
            }
            console.table(data);
            if (data.permission < 2) {
              this.userService.getUsersById(data.id).subscribe((res) => {
                if (remidme) {
                  localStorage.setItem('user', JSON.stringify(data));
                  localStorage.setItem('server', JSON.stringify(res.server));
                } else {
                  sessionStorage.setItem('user', JSON.stringify(data));
                  sessionStorage.setItem('server', JSON.stringify(res.server));
                }
                this.ngxSpinner.hide();
                this.router.navigate(['']);
              });
            } else {
              this.ngxSpinner.hide();
              this.router.navigate(['/servers']);
            }
          },
          (err) => {
            if (err.status == 401) {
              this.snackBar.showMessage('Email ou senha inválido', true);
              console.log('Email ou senha incorretos');
              this.ngxSpinner.hide();
            } else {
              console.log('', err);
              this.snackBar.showMessage('Erro ao tentar conectar', true);
              this.ngxSpinner.hide();
            }
          }
        );
    }
  }

  onSubmit() {}

  hasError(field: string) {
    return this.form.get(field).errors;
  }
}
