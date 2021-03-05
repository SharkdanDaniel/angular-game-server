import { LoginService } from './../../core/services/login.service';
import { ExpMachinesService } from './../../core/services/exp-machines.service';
import { JobsService } from './../../core/services/jobs.service';
import { DiseaseService } from './../../core/services/disease.service';
import { AvatarService } from './../../core/services/avatar.service';
import { UserService } from './../../core/services/user.service';
import { map } from 'rxjs/operators';
import { ServersService } from './../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  server: any = {};
  avatars$: Observable<any[]>;
  diseases$: Observable<any[]>;
  jobs$: Observable<any[]>;
  expMachines$: Observable<any[]>;
  users$: Observable<any[]>;

  avatarBanned = 0;
  avatarAvailable = 0;

  chartOptionXp: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '15%'
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
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 5, name: 'Ativadas' },
          { value: 4, name: 'Desativadas' }
        ]
      }
    ]
  };

  chartOptionAvatar: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Set 2020', 'Out 2020', 'Nov 2020', 'Dez 2020', 'Jan 2021']
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '15%',
      right: '1%'
    },
    grid: [
      {
        top: '18%',
        width: '67%',
        bottom: '15%',
        left: '3%',
        containLabel: true
      }
    ],
    series: [
      {
        data: [50, 700, 100, 1000, 150, 500, 800, 700, 150],
        type: 'bar',
        color: 'rgb(120, 74, 248)',
        barWidth: '8px'
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
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: this.avatarAvailable, name: 'Disponíveis' },
          { value: this.avatarBanned, name: 'Banidos' }
        ]
      }
    ]
  };

  constructor(
    private loginService: LoginService,
    private serverService: ServersService,
    private userService: UserService,
    private avatarService: AvatarService,
    private diseaseService: DiseaseService,
    private jobService: JobsService,
    private expMachineService: ExpMachinesService
  ) {
    this.avatars();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.serverService
      .getById(this.loginService.getServer().id)
      .subscribe((res: any) => (this.server = res));
    this.users$ = this.userService.getAll();
    this.avatars$ = this.avatarService.getAll();
    this.diseases$ = this.diseaseService
      .getAll()
      .pipe(map((data: any) => data.availableDisease));
    this.jobs$ = this.jobService.getAll();
    this.expMachines$ = this.expMachineService.getAll();
  }

  avatars() {
    this.avatarService.getAll().subscribe((a: any) => {
      a.forEach(el => {
        if (el.isBanned) {
          this.avatarBanned++;
        } else {
          this.avatarAvailable++;
        }
      });
    });
  }
}
