import { AvatarService } from './../../../core/services/avatar.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-ban',
  templateUrl: './avatar-ban.component.html',
  styleUrls: ['./avatar-ban.component.scss'],
})
export class AvatarBanComponent implements OnInit {
  form: FormGroup;
  avatar: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private avatarService: AvatarService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      reason: [''],
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.avatarService.getAvatars()
    .pipe(take(1))
    .subscribe(res => {
      res.forEach(s => {
        if (s.uuid == id) {
          this.avatar = s;
          console.log(this.avatar);
        }
      })
    })
  }

  ban() {
    this.avatarService
      .banAvatar(this.avatar, this.form.value.reason)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('Avatar banido', res);
        this.router.navigate(['/avatar']);
      });
  }
}
