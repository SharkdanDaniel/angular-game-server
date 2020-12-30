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
  user: any;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      permission: [0],
      serverId: [JSON.parse(sessionStorage.getItem('server')).id]
    });
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  create() {
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
