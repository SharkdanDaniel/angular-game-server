import { Server } from './../models/server';
import { take, map } from 'rxjs/operators';
import { Item } from './../models/item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServersService } from './servers.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(
    private http: HttpClient,
    private token: TokenService,
    private server: ServersService
  ) {}

  getItems(): Observable<Item> {
    return this.http
      .get<any>(
        `https://hcs.dev4.com.br/api/Item/ListServerWithItems/${this.token.getToken()}/${this.server.getServerID()}`
      )
      .pipe(
        map((res: any) => res.availableItems),
        take(1)
      );
  }

  createItem(item: any): Observable<Item> {
    return this.http
      .post<any>(
        `https://hcs.dev4.com.br/api/Item/AddItemToServer/${this.token.getToken()}/${this.server.getServerID()}`,
        item
      )
      .pipe(take(1));
  }

  updateItem(item: any): Observable<Item> {
    return this.http
      .put<any>(
        `https://hcs.dev4.com.br/api/Item/EditItemFromServer/${this.token.getToken()}/${this.server.getServerID()}/${
          item.id
        }`,
        item
      )
      .pipe(take(1));
  }

  deleteItem(id: string): Observable<Item> {
    return this.http
      .delete<any>(
        `https://hcs.dev4.com.br/api/Item/RemoveItemFromServer/${this.token.getToken()}/${this.server.getServerID()}/${id}`
      )
      .pipe(take(1));
  }
}
