import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarService } from './../../../core/services/avatar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-update',
  templateUrl: './avatar-update.component.html',
  styleUrls: ['./avatar-update.component.scss'],
})
export class AvatarUpdateComponent implements OnInit {
  form: FormGroup;
  false: boolean = false;
  true: boolean = true;

  constructor(
    private avatarService: AvatarService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null],
      health: [null],
      hungry: [null],
      armor: [null],
      money: [null],
      experience: [null],
      statsPoints: [null],
      strength: [null],
      endurance: [null],
      agility: [null],
      accuracy: [null],
      isLeader: [null],
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.avatarService
      .getAvatars()
      .pipe(take(1))
      .subscribe((data) => {
        data.forEach((el) => {
          if (el.uuid == id) {
            this.form = this.formBuilder.group(el);
            console.log(this.form.value);
          }
        });
      });
  }

  update() {
    this.avatarService
      .updateAvatar(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        this.router.navigate(['avatar']);
        console.log('Avatar atualizado', res);
      });
  }
}
