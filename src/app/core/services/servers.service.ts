import { ExpTable } from './../models/exp-table';
import { take } from 'rxjs/operators';
import { Server } from './../models/server';
import { CrudService } from './../../shared/classes/crud-service';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServersService extends CrudService<Server> {
  constructor(protected injector: Injector) {
    super(injector);
    this.setGetAll = `Servers/ListServers/${this.tokenService.getToken()}`;
    this.setGetById = `Servers/GetServer/${this.tokenService.getToken()}`;
    this.setCreate = `Servers/AddServers/${this.tokenService.getToken()}`;
    this.setUpdate = `Servers/EditServer/${this.tokenService.getToken()}`;
  }

  updateExpTable(id: string, expTable: ExpTable[]): Observable<ExpTable> {
    return this.http
      .put<ExpTable>(
        `https://hcs.dev4.com.br/api/Servers/EditExpTable/${this.tokenService.getToken()}/${id}`,
        expTable
      )
      .pipe(take(1));
  }

  updateAvailableItems(id: string, AvailableItem: any): Observable<any> {
    return this.http
      .put<any>(
        `https://hcs.dev4.com.br/api/Servers/EditAvailableItems/${this.tokenService.getToken()}/${id}`,
        AvailableItem
      )
      .pipe(take(1));
  }
}
