import { UserService } from './../../core/services/user.service';
import { LoginService } from '../../core/services/login.service';
import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent<any> {
  submitted = false;
  passwordInvalid = false;

  constructor(
    // protected login: LoginService,
    protected injector: Injector,
    protected userService: UserService
  ) {
    super(injector, userService);
  }

  buildForm() {
    this.passwordInvalid = false;
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remidme: [false]
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const remidme = this.form.get('remidme').value;
      this.ngxSpinner.show();
      this.loginService
        .postLogin(this.form.value)
        .subscribe(
          (data: any) => {
            if (remidme) {
              localStorage.setItem('user', JSON.stringify(data));
            } else {
              sessionStorage.setItem('user', JSON.stringify(data));
            }
            // console.table(data);
            if (data.permission < 2) {
              this.userService.getById(data.id).subscribe(res => {
                if (remidme) {
                  // localStorage.setItem('user', JSON.stringify(data));
                  localStorage.setItem('server', JSON.stringify(res.server));
                } else {
                  // sessionStorage.setItem('user', JSON.stringify(data));
                  sessionStorage.setItem('server', JSON.stringify(res.server));
                }
                // this.ngxSpinner.hide();
                this.router.navigate(['']);
              });
            } else {
              // this.ngxSpinner.hide();
              this.router.navigate(['/servers']);
            }
          },
          err => {
            if (err.status == 401) {
              // this.snackBar.showMessage('Email ou senha inválido', true);
              this.passwordInvalid = true;
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
}
