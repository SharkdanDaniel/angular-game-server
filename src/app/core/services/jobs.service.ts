import { take } from 'rxjs/operators';
import { ServersService } from './servers.service';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(
    private http: HttpClient,
    private token: TokenService,
    private server: ServersService
  ) {}

  getJobs(): Observable<any[]> {
    return this.http
      .get<any[]>(
        `https://hcs.dev4.com.br/api/Jobs/GetJobs/${this.token.getToken()}/${this.server.getServerID()}`
      )
      .pipe(take(1));
  }

  createJob(job: any): Observable<any> {
    return this.http
      .post<any>(
        `https://hcs.dev4.com.br/api/Jobs/AddJob/${this.token.getToken()}/${this.server.getServerID()}`,
        job
      )
      .pipe(take(1));
  }

  updateJob(job: any): Observable<any> {
    return this.http
      .put<any>(
        `https://hcs.dev4.com.br/api/Jobs/EditJob/${this.token.getToken()}/${
          job.id
        }`,
        job
      )
      .pipe(take(1));
  }

  deleteJob(id: string): Observable<any> {
    return this.http
      .put<any>(
        `https://hcs.dev4.com.br/api/Jobs/DeleteJob/${this.token.getToken()}/${id}`,
        true
      )
      .pipe(take(1));
  }
}
