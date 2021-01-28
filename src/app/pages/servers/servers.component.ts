import { NgxSpinnerService } from 'ngx-spinner';
import {
  TableColumn,
  TableAction,
} from './../../shared/modules/table/table-models.model';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ServersService } from './../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
})
export class ServersComponent implements OnInit {
  servers: any[] = [];
  serversBkp: any[] = [];

  showBody = true;
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  // dataSource: any[];
  // columns: TableColumn[] = [
  //   {
  //     columnName: 'name',
  //     displayName: 'Nome',
  //   },
  //   {
  //     columnName: 'shared',
  //     displayName: 'Compartilhado',
  //   },
  //   {
  //     columnName: 'hasDisease',
  //     displayName: 'Debuffs',
  //   },
  //   {
  //     columnName: 'initialMoney',
  //     displayName: 'Dinheiro Inicial',
  //   },
  // ];

  // actions: TableAction[] = [
  //   {
  //     eventName: 'edit',
  //     iconClass: 'fas fa-pen',
  //   },
  // ];

  // pageSize = 4;
  // index = 0;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private ngxSpinner: NgxSpinnerService
  ) {
    this.ngxSpinner.show();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.serversService.getAll().subscribe((data) => {
      console.log(data);
      this.collectionSize = data.length;
      this.serversBkp = data;
      this.servers = data.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
      this.ngxSpinner.hide();
    });
  }

  refreshServers() {
    this.ngxSpinner.show('table')
    this.showBody = false;
    setTimeout(() => {
      this.servers = this.serversBkp.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
      this.showBody = true;
      this.ngxSpinner.hide('table');
    }, 300);
    
  }

  setServer(server: any) {
    this.ngxSpinner.show();
    if (localStorage.getItem('user')) {
      localStorage.setItem('server', JSON.stringify(server));
    } else {
      sessionStorage.setItem('server', JSON.stringify(server));
    }
    setTimeout(() => {
      this.router.navigate(['']);      
    }, 400);
    
  }

  // setPage(event) {
  //   this.dataSource = null;
  //   this.dataSource = this.servers.slice(this.pageSize * event, this.pageSize * (event + 1));
  //   console.log(this.dataSource);
  // }
}
