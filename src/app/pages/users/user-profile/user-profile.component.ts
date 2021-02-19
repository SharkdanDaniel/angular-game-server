import { FormValidation } from './../../../shared/classes/form.validation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../../core/services/user.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';

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

  hide1 = false;
  hide2 = true;
  hide3 = true;

  constructor(
    protected snackBar: SnackbarService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    protected modal: NgbModal
  ) {
    super(snackBar, modal);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      permission: [0, [Validators.required]],
      serverId: [''],
    });
    this.user = this.userService.getUser();
    this.userService.getUsersById(this.user.id).subscribe((data: any) => {
      this.showPassord = new FormControl(data.password)
      this.form = this.formBuilder.group(data);
      this.form.get('password').setValue(0, [Validators.required, Validators.minLength(3)]);
      this.confirmPassword = new FormControl('', CustomValidators.equalTo(this.form.get('password')));
    });
  }

  submit() {
    console.log(this.form);
  }

  passwordValid() {}
}
