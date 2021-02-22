import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { FormValidation } from './../../../shared/classes/form.validation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../../core/services/user.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent extends BaseFormComponent implements OnInit {
  user: any;
  active = 1;
  showPassord: FormControl;

  passwordIsValid = false;

  hide1 = true;
  hide2 = true;
  hide3 = true;

  constructor(
    protected snackBar: SnackbarService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    protected modal: NgbModal,
    private ngxSpiner: NgxSpinnerService,
    private location: Location
  ) {
    super(snackBar, modal);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      permission: [0],
      serverId: [''],
    });
    this.user = this.userService.getUser();
    this.userService.getUsersById(this.user.id).subscribe((data: any) => {
      this.showPassord = new FormControl(data.password);
      this.form = this.formBuilder.group({
        id: [data.id],
        name: [data.name, [Validators.required]],
        email: [data.email, [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        permission: [data.permission, [Validators.required]],
        server: [data.server ? data.server : ''],
      });
      this.confirmPassword = new FormControl('', [
        Validators.required,
        CustomValidators.equalTo(this.form.get('password')),
      ]);
    });
  }

  submit() {
    if (this.showPassord.valid) {
      this.userService
        .updateUser(this.form.value)
        .pipe(
          catchError((err) => {
            this.ngxSpiner.hide();
            this.snackBar.showMessage('Erro ao salvar as alterações', true);
            return err;
          })
        )
        .subscribe((res) => {
          this.snackBar.showMessage('As alterações foram salvas com sucesso');
          this.location.back();
        });
    }
  }

  passwordValid() {}
}
