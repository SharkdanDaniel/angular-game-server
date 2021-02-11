import { SnackbarService } from './../../../core/services/snackbar.service';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent extends BaseFormComponent implements OnInit {
  user: any;
  // form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxSpinner: NgxSpinnerService,
    protected snackBar: SnackbarService
  ) {
    super(snackBar);
  }

  ngOnInit(): void {
    this.ngxSpinner.show();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      permission: [0, [Validators.required]],
      serverId: [JSON.parse(sessionStorage.getItem('server')).id],
    });
    this.user = JSON.parse(sessionStorage.getItem('user'));
    setTimeout(() => {
      this.ngxSpinner.hide();
    }, 200);
  }

  submit() {
    this.userService
      .createUser(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        this.snackBar.showMessage('Usuário adicionado com sucesso!');
        console.log('usuário criado', res);
        this.router.navigate(['/users']);
      }),
      (err) => {
        console.log(err);
        this.snackBar.showMessage('Não foi possível adicionar o usuário!');
      };
  }

  // save() {
  //   this.form.markAllAsTouched();
  //   if (this.form.valid) {
  //     this.userService
  //       .createUser(this.form.value)
  //       .pipe(take(1))
  //       .subscribe((res) => {
  //         this.snackBar.showMessage('Usuário adicionado com sucesso!')
  //         console.log('usuário criado', res);
  //         this.router.navigate(['/users']);
  //       }),
  //       (err) => {
  //         console.log(err)
  //         this.snackBar.showMessage('Não foi possível adicionar o usuário!')
  //       }
  //   } else {
  //     this.snackBar.showMessage('Verifique os erros e tente novamente!', true)
  //     console.log('invalid');
  //   }
  // }
}
