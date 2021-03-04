import { ExpTable } from './../models/exp-table';
import { take } from 'rxjs/operators';
import { Server } from './../models/server';
import { SnackbarService } from './snackbar.service';
import { CrudService } from './../../shared/classes/crud-service';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServersService extends CrudService<Server> {
  constructor(
    protected tokenService: TokenService,
    protected injector: Injector,
    protected snackBar: SnackbarService,
  ) {
    super(snackBar, injector, tokenService );
    this.setGetAll = `Servers/ListServers/${this.token}`;
    this.setGetById = `Servers/GetServer/${this.token}`;
    this.setCreate = `Servers/AddServers/${this.token}`;
    this.setUpdate = `Servers/EditServer/${this.token}`;
  }

  // getServers(): Observable<any[]> {
  //   return this.http.get<any[]>(`https://hcs.dev4.com.br/api/Servers/ListServers/${this.token.getToken()}`)
  // }

  // getServerById(id: string): Observable<Server> {
  //   return this.http.get<Server>(
  //     `https://hcs.dev4.com.br/api/Servers/GetServer/${this.token.getToken()}/${id}`
  //   ).pipe(take(1));
  // }

  // createServer(server: Server): Observable<Server> {
  //   return this.http.post<Server>(
  //     `https://hcs.dev4.com.br/api/Servers/AddServers/${this.token.getToken()}`,
  //     server
  //   ).pipe(take(1));
  // }

  // updateServer(server: Server): Observable<Server> {
  //   return this.http.put<Server>(
  //     `https://hcs.dev4.com.br/api/Servers/EditServer/${this.token.getToken()}/${
  //       server.id
  //     }`,
  //     server
  //   ).pipe(take(1));
  // }

  updateExpTable(id: string, expTable: ExpTable[]): Observable<ExpTable> {
    return this.http.put<ExpTable>(
      `https://hcs.dev4.com.br/api/Servers/EditExpTable/${this.token}/${id}`,
      expTable
    ).pipe(take(1));
  }

  updateAvailableItems(id: string, AvailableItem: any): Observable<any> {
    return this.http.put<any>(
      `https://hcs.dev4.com.br/api/Servers/EditAvailableItems/${this.token}/${id}`,
      AvailableItem
    ).pipe(take(1));
  }

  getServerID() {
    let serverId;
    if (localStorage.getItem('server')) {
      serverId = JSON.parse(localStorage.getItem('server')).id;
    } else {
      serverId = JSON.parse(sessionStorage.getItem('server')).id;
    }
    return serverId;
  }

  getServer() {
    let server = {};
    if (localStorage.getItem('server')) {
      server = JSON.parse(localStorage.getItem('server'));
    } else {
      server = JSON.parse(sessionStorage.getItem('server'));
    }
    return server;
  }
}
