import { CrudService } from 'src/app/shared/classes/crud-service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService extends CrudService<any> {
  constructor(
    protected injector: Injector,
  ) {
    super(injector);
    this.setGetAll = `Disease/ListServerWithDiseases/${this.tokenService.getToken()}/${this.loginService.getServer().id}`;
    this.setCreate = `Disease/AddDiseaseToServer/${this.tokenService.getToken()}/${this.loginService.getServer().id}`;
    this.setUpdate = `Disease/EditDiseaseFromServer/${this.tokenService.getToken()}`;
    this.setDelete = `Disease/RemoveDiseaseFromServer/${this.tokenService.getToken()}/${this.loginService.getServer().id}`;
  }
}
