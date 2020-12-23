import { take } from 'rxjs/operators';
import { AvatarService } from './../../core/services/avatar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  avatars: any[];
  count: number;

  constructor(
    private avatarService: AvatarService,
  ) { }

  ngOnInit(): void {
    this.avatarService.getAvatars()
    .pipe(take(1))
    .subscribe((data) => {
      this.avatars = data;
      this.count = data.length
      console.log(this.avatars);
    })
  }

}
