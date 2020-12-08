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
export class UserCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      permission: [0],
    });
  }

  ngOnInit(): void {}

  create() {
    // console.log(this.form.value);
    this.userService
      .createUser(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        console.log('usuário criado');
        this.router.navigate(['/users']);
      });
  }
}
