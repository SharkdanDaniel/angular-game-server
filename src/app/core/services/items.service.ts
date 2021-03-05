import { CrudService } from 'src/app/shared/classes/crud-service';
import { Item } from './../models/item';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsService extends CrudService<Item> {
  constructor(
    protected injector: Injector,
  ) {
    super(injector)
    this.setGetAll = `Item/ListServerWithItems/${this.tokenService.getToken()}/${this.loginService.getServer().id}`;
    this.setCreate = `Item/AddItemToServer/${this.tokenService.getToken()}/${this.loginService.getServer().id}`;
    this.setUpdate = `Item/EditItemFromServer/${this.tokenService.getToken()}/${this.loginService.getServer().id}`;
    this.setDelete = `Item/RemoveItemFromServer/${this.tokenService.getToken()}/${this.loginService.getServer().id}`
  }
}