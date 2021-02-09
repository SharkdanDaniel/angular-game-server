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
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  server: any = {};
  users: any[] = [];
  avatars: any[] = [];
  diseases: any[] = [];
  jobs: any[] = [];
  expMachines: any[] = [];

  chartOptionXp: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '15%',
    },
    series: [
      {
        color: ['#6241EA', '#F48C51'],
        name: 'quantidade',
        type: 'pie',
        radius: ['50%', '40%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 5, name: 'Ativadas' },
          { value: 4, name: 'Desativadas' },
        ],
      },
    ],
  };

  chartOptionAvatar: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Set 2020', 'Out 2020', 'Nov 2020', 'Dez 2020', 'Jan 2021'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '15%',
      right: '1%',
    },
    grid: [
      {
        top: '18%',
        width: '67%',
        bottom: '15%',
        left: '3%',
        containLabel: true,
      },
    ],
    series: [
      {
        data: [50, 700, 100, 1000, 150, 500, 800, 700, 150],
        type: 'bar',
        color: 'rgb(120, 74, 248)',
        barWidth: '8px',
      },
      {
        color: ['#6241EA', '#F48C51'],
        name: 'quantidade',
        type: 'pie',
        radius: ['50%', '40%'],
        center: ['87%', '40%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 10, name: 'Disponíveis' },
          { value: 2, name: 'Banidos' },
        ],
      },
    ],
  };

  constructor(
    private serverService: ServersService,
    private login: LoginService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private avatarService: AvatarService,
    private diseaseService: DiseaseService,
    private jobService: JobsService,
    private expMachineService: ExpMachinesService
  ) {}

  ngOnInit(): void {
    // this.spinner.show();
    this.getAll();
    // this.refresh();
    // setTimeout(() => {
    // this.spinner.hide();
    // this.spinner.hide();
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
        this.diseases = diseases.availableDisease;
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
