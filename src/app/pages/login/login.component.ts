import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './../../core/guards/auth.guard';
import { UserService } from './../../core/services/user.service';
import { LoginService } from '../../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  // form: FormGroup;
  submitted = false;
  passwordInvalid = false;

  constructor(
    private login: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    protected snackBar: SnackbarService,
    private ngxSpinner: NgxSpinnerService,
    protected modal: NgbModal    
  ) {
    super(snackBar, modal);
  }

  ngOnInit(): void {
    
    this.passwordInvalid = false;
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remidme: [false],
    });
  }

  submit() {}

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const remidme = this.form.get('remidme').value;
      this.ngxSpinner.show();
      this.login
        .postLogin(this.form.value)
        // .pipe(take(1))
        .subscribe(
          (data: any) => {
            if (remidme) {
              localStorage.setItem('user', JSON.stringify(data));
            } else {
              sessionStorage.setItem('user', JSON.stringify(data));
            }
            // console.table(data);
            if (data.permission < 2) {
              this.userService.getUsersById(data.id).subscribe((res) => {
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
          (err) => {
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

  // erroCss(field: string) {
  //   console.log('teste');
  //   return {
  //     'is-invalid':
  //       this.form.get(field).errors && this.form.get(field).touched,
  //   };
  // }
}
