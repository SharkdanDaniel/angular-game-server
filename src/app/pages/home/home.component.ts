import { ItemsService } from './../../core/services/items.service';
import { ExpMachinesService } from './../../core/services/exp-machines.service';
import { JobsService } from './../../core/services/jobs.service';
import { DiseaseService } from './../../core/services/disease.service';
import { AvatarService } from './../../core/services/avatar.service';
import { UserService } from './../../core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';
import { LoginService } from './../../core/services/login.service';
import { ServersService } from './../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  server: any;
  users: any[];
  avatars: any[];
  diseases: any;
  jobs: any[];
  expMachines: any[];

  constructor(
    private serverService: ServersService,
    private login: LoginService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private avatarService: AvatarService,
    private diseaseService: DiseaseService,
    private jobService: JobsService,
    private expMachineService: ExpMachinesService,
  ) {
    this.spinner.show('content');
  }

  ngOnInit(): void {
    this.getAll();
    // this.refresh();
    // setTimeout(() => {
    this.spinner.hide('content');
    this.spinner.hide();
    // }, 300);
  }

  getAll() {
    this.server = this.serverService.getServer();
    this.userService
      .getUsers()
      .pipe(take(1))
      .subscribe((users: any) => {
        this.users = users;
      });
    this.avatarService
      .getAvatars()
      .pipe(take(1))
      .subscribe((avatars: any) => {
        this.avatars = avatars;
      });
    this.diseaseService
      .getDiseases()
      .pipe(take(1))
      .subscribe((diseases: any) => {
        console.log('debuffs', diseases);
        this.diseases = diseases;
      });
    this.jobService
      .getJobs()
      .pipe(take(1))
      .subscribe((jobs: any) => {
        this.jobs = jobs;
      });
    this.expMachineService
      .getExpMachines()
      .pipe(take(1))
      .subscribe((expMachines: any) => {
        this.expMachines = expMachines;
      });
  }

  // refresh() {
  // this.login.getUser().pipe(take(1)).subscribe((res: any) => {
  //   console.log('home user')
  //   this.user = res;
  // }),
  // (err) => {
  //   console.log(err)
  // }
  // this.serverService.getServer().pipe(take(1)).subscribe((res: any) => {
  //   console.log('home server')
  //   this.server = res;
  // }),
  // (err) => {
  //   console.log(err)
  // }
  //   if (localStorage.getItem('user')) {
  //     this.user = JSON.parse(localStorage.getItem('user'));
  //   } else {
  //     this.user = JSON.parse(sessionStorage.getItem('user'));
  //   }

  //   if (localStorage.getItem('server')) {
  //     this.server = JSON.parse(localStorage.getItem('server'));
  //   } else {
  //     this.server = JSON.parse(sessionStorage.getItem('server'));
  //   }

  // }
}
