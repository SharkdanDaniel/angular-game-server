import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CrudService } from 'src/app/shared/classes/crud-service';
import { Item } from './../models/item';
import { ServersService } from './servers.service';
import { TokenService } from './token.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsService extends CrudService<Item> {
  constructor(
    protected injector: Injector,
    protected tokenService: TokenService,
    private server: ServersService,
    protected snackBar: SnackbarService
  ) {
    super(snackBar, injector, tokenService)
    this.setGetAll = `Item/ListServerWithItems/${this.token}/${this.server.getServerID()}`;
    this.setCreate = `Item/AddItemToServer/${this.token}/${this.server.getServerID()}`;
    this.setUpdate = `Item/EditItemFromServer/${this.token}/${this.server.getServerID()}`;
    this.setDelete = `Item/RemoveItemFromServer/${this.token}/${this.server.getServerID()}`
  }

  // getItems(): Observable<Item> {
  //   return this.http
  //     .get<any>(
  //       `https://hcs.dev4.com.br/api/Item/ListServerWithItems/${this.token.getToken()}/${this.server.getServerID()}`
  //     )
  //     .pipe(
  //       map((res: any) => res.availableItems),
  //       take(1)
  //     );
  // }

  // createItem(item: any): Observable<Item> {
  //   return this.http
  //     .post<any>(
  //       `https://hcs.dev4.com.br/api/Item/AddItemToServer/${this.token.getToken()}/${this.server.getServerID()}`,
  //       item
  //     )
  //     .pipe(take(1));
  // }

  // updateItem(item: any): Observable<Item> {
  //   return this.http
  //     .put<any>(
  //       `https://hcs.dev4.com.br/api/Item/EditItemFromServer/${this.token.getToken()}/${this.server.getServerID()}/${
  //         item.id
  //       }`,
  //       item
  //     )
  //     .pipe(take(1));
  // }

  // deleteItem(id: string): Observable<Item> {
  //   return this.http
  //     .delete<any>(
  //       `https://hcs.dev4.com.br/api/Item/RemoveItemFromServer/${this.token.getToken()}/${this.server.getServerID()}/${id}`
  //     )
  //     .pipe(take(1));
  // }
}
