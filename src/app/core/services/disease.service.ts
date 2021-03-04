import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CrudService } from 'src/app/shared/classes/crud-service';
import { ServersService } from './servers.service';
import { TokenService } from './token.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService extends CrudService<any> {
  constructor(
    protected injector: Injector,
    protected tokenService: TokenService,
    protected server: ServersService,
    protected snackBar: SnackbarService
  ) {
    super(snackBar, injector, tokenService);
    this.setGetAll = `Disease/ListServerWithDiseases/${this.token}/${this.server.getServerID()}`;
    this.setCreate = `Disease/AddDiseaseToServer/${this.token}/${this.server.getServerID()}`;
    this.setUpdate = `Disease/EditDiseaseFromServer/${this.token}`;
    this.setDelete = `Disease/RemoveDiseaseFromServer/${this.token}/${this.server.getServerID()}`;
  }

  // getDiseases(): Observable<any> {
  //   return this.http.get<any>(
  //     `https://hcs.dev4.com.br/api/Disease/ListServerWithDiseases/${this.token.getToken()}/${this.server.getServerID()}`
  //   ).pipe(take(1));
  // }

  // createDisease(disease: any): Observable<any> {
  //   return this.http.post<any>(
  //     `https://hcs.dev4.com.br/api/Disease/AddDiseaseToServer/${this.token.getToken()}/${this.server.getServerID()}`,
  //     disease
  //   ).pipe(take(1));
  // }

  // updateDisease(disease: any): Observable<any> {
  //   return this.http.put<any>(
  //     `https://hcs.dev4.com.br/api/Disease/EditDiseaseFromServer/${this.token.getToken()}/${disease.id}`,
  //     disease
  //   ).pipe(take(1));
  // }

  // deleteDisease(id: string): Observable<any> {
  //   return this.http.delete<any>(
  //     `https://hcs.dev4.com.br/api/Disease/RemoveDiseaseFromServer/${this.token.getToken()}/${this.server.getServerID()}/${id}`
  //   ).pipe(take(1));
  // }
}
