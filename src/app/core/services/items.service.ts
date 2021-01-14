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

  getItems(): Observable<any> {
    return this.http.get<any>(
      `https://hcs.dev4.com.br/api/Item/ListServerWithItems/${this.token.getToken()}/${this.server.getServerID()}`
    );
  }

  createItem(item: any): Observable<any> {
    return this.http.post<any>(
      `https://hcs.dev4.com.br/api/Item/AddItemToServer/${this.token.getToken()}/${this.server.getServerID()}`,
      item
    );
  }

  updateItem(item: any): Observable<any> {
    return this.http.put<any>(
      `https://hcs.dev4.com.br/api/Item/EditItemFromServer/${this.token.getToken()}/${this.server.getServerID()}/${
        item.id
      }`,
      item
    );
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete<any>(
      `https://hcs.dev4.com.br/api/Item/RemoveItemFromServer/${this.token.getToken()}/${this.server.getServerID()}/${id}`
    );
  }
}
