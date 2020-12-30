import { take } from 'rxjs/operators';
import { AvatarService } from './../../../core/services/avatar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-unban',
  templateUrl: './avatar-unban.component.html',
  styleUrls: ['./avatar-unban.component.scss'],
})
export class AvatarUnbanComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private avatarService: AvatarService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      bannedReason: [{ value: '', disabled: true }],
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.avatarService
      .getAvatars()
      .pipe(take(1))
      .subscribe((res) => {
        res.forEach((s) => {
          if (s.uuid == id) {
            this.form = this.formBuilder.group(s);
            console.log(this.form.value);
          }
        });
      });
  }

  unBan() {
    this.avatarService
      .unbanAvatar(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('Avatar desbanido', res);
        this.router.navigate(['/avatar']);
      });
  }
}
