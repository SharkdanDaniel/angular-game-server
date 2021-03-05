import { CrudService } from 'src/app/shared/classes/crud-service';
import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {
  constructor(
    protected http: HttpClient,
    protected injector: Injector
  ) {
    super(injector);
  }

  getAll() {
    this.setGetAll = `Users/GetUsers/${this.tokenService.getToken()}`;
    return super.getAll();
  }

  getById(id: string) {
    this.setGetById = `Users/GetUser/${this.tokenService.getToken()}`;
    return super.getById(id);
  }

  create(user: User) {
    this.setCreate = `Users/AddUser/${this.tokenService.getToken()}`;
    return super.create(user);
  }

  update(user: User) {
    this.setUpdate = `Users/EditUser/${this.tokenService.getToken()}`;
    return super.update(user);
  }

  delete(id: string) {
    this.setDelete = `Users/DelUser/${this.tokenService.getToken()}`;
    return super.delete(id);
  }
}
