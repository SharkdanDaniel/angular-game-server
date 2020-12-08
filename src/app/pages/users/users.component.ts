import { take } from 'rxjs/operators';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        this.users = res;
      });
  }
}
