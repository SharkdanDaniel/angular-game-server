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
    super(snackBar, injector, tokenService);
    this.setGetAll = `Jobs/GetJobs/${this.token}/${this.server.getServerID()}`;
    this.setCreate = `Jobs/AddJob/${this.token}/${this.server.getServerID()}`;
    this.setUpdate = `Jobs/EditJob/${this.token}`;
    this.setDelete = `Jobs/DeleteJob/${this.token}`;
  }

  // getJobs(): Observable<any[]> {
  //   return this.http
  //     .get<any[]>(
  //       `https://hcs.dev4.com.br/api/Jobs/GetJobs/${this.token.getToken()}/${this.server.getServerID()}`
  //     )
  //     .pipe(take(1));
  // }

  // createJob(job: any): Observable<any> {
  //   return this.http
  //     .post<any>(
  //       `https://hcs.dev4.com.br/api/Jobs/AddJob/${this.token.getToken()}/${this.server.getServerID()}`,
  //       job
  //     )
  //     .pipe(take(1));
  // }

  // updateJob(job: any): Observable<any> {
  //   return this.http
  //     .put<any>(
  //       `https://hcs.dev4.com.br/api/Jobs/EditJob/${this.token.getToken()}/${
  //         job.id
  //       }`,
  //       job
  //     )
  //     .pipe(take(1));
  // }

  delete(id: string): Observable<Job> {
    return this.http
      .put<any>(
        `https://hcs.dev4.com.br/api/Jobs/DeleteJob/${this.token}/${id}`,
        true
      )
      .pipe(take(1));
  }
}
