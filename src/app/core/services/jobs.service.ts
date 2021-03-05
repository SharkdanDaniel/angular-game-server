import { take } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Job } from './../models/job';
import { CrudService } from 'src/app/shared/classes/crud-service';
import { ServersService } from './servers.service';
import { TokenService } from './token.service';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService extends CrudService<Job> {
  constructor(
    protected injector: Injector,
    protected tokenService: TokenService,
    private server: ServersService,
    protected snackBar: SnackbarService
  ) {
    super(injector);
    this.setGetAll = `Jobs/GetJobs/${this.tokenService.getToken()}/${this.loginService.getServer().id}`;
    this.setCreate = `Jobs/AddJob/${this.tokenService.getToken()}/${this.loginService.getServer().id}`;
    this.setUpdate = `Jobs/EditJob/${this.tokenService.getToken()}`;
    this.setDelete = `Jobs/DeleteJob/${this.tokenService.getToken()}`;
  }

  delete(id: string): Observable<Job> {
    return this.http
      .put<any>(
        `https://hcs.dev4.com.br/api/Jobs/DeleteJob/${this.tokenService.getToken()}/${id}`,
        true
      )
      .pipe(take(1));
  }
}
