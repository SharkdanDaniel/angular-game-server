import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  usersBkp: any[] = [];

  showBody = true;
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  constructor(
    private ngxSpinner: NgxSpinnerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userService.getUsers().subscribe((res: any) => {
      this.collectionSize = res.length;
      // console.log(res);
      this.usersBkp = res;
      this.users = res.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
      this.ngxSpinner.hide();
    });
  }

  refreshUsers() {
    this.ngxSpinner.show('table');
    this.showBody = false;
    setTimeout(() => {
      this.users = this.usersBkp.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
      this.showBody = true;
      this.ngxSpinner.hide('table');
    }, 300);
  }

  searchUser(ev) {
    let value = ev;
    if (value.trim() != '') {
      this.ngxSpinner.show('table');
      setTimeout(() => {
        this.users = this.usersBkp.filter((user: any) => {
          this.ngxSpinner.hide('table');
          return user.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
        });
      }, 200);
    }
  }

  onKey(ev) {
    let value = ev.target.value;
    if (value == '') {
      this.refreshUsers();
    }
  }

  getUsers() {
    return this.users;
  }
}
