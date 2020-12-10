import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {
  user: any = {};

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.userService.getUsersById(id)
      .pipe(take(1))
      .subscribe((data) => {
        this.user = data;
      }
    )
  }

  delete(id: string) {
    this.userService.deleteUser(id)
      .pipe(take(1))
      .subscribe(res => {
        console.log('Usuário deletado', res)
        this.router.navigate(['/users'])
      }
    );
  }

}
