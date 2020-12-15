import { map, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../core/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      permission: [0],
      serverId: ['']
    });
    const id = this.route.snapshot.paramMap.get('id')
    this.userService.getUsersById(id)
      .pipe(take(1))
      .subscribe((user) => {
        this.form = this.formBuilder.group(user);
        console.log(this.form.value)
      }
    )

  }

  update() {
    this.userService
      .updateUser(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        console.log('usuário criado');
        this.router.navigate(['/users']);
      }
    );
  }

}
