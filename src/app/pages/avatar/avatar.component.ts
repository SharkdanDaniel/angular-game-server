import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AvatarService } from './../../core/services/avatar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  avatars: any[];
  count: number;

  constructor(private avatarService: AvatarService, private router: Router) {}

  ngOnInit(): void {
    this.refreshAvatar();
  }

  refreshAvatar() {
    this.avatarService
      .getAvatars()
      .pipe(take(1))
      .subscribe((data) => {
        this.avatars = data;
        this.count = data.length;
        console.log(this.avatars);
      });
  }

  setStyle(avatar: any) {
    if (avatar.isBanned) {
      let style = {
        color: 'red',
      };
      return style;
    }
  }

  ban(avatar: any) {
    let reason = prompt('Motivo do ban', '');
    if (reason == null || reason == '') {
      console.log('ban cancelado');
    } else {
      this.avatarService
        .banAvatar(avatar, reason)
        .pipe(take(1))
        .subscribe((res) => {
          console.log('Avatar banido', res);
          this.refreshAvatar();
        });
    }
  }

  unBan(avatar: any) {
    this.avatarService
      .unbanAvatar(avatar)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('Avatar desbanido', res);
        this.refreshAvatar();
      });
  }
}
