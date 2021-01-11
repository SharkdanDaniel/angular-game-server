import { Observable } from 'rxjs';
import { ServersService } from './servers.service';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpMachinesService {
  constructor(
    private http: HttpClient,
    private token: TokenService,
    private server: ServersService
  ) {}

  getExpMachines(): Observable<any[]> {
    return this.http.get<any[]>(
      `http://hcs.dev4.com.br/api/ExpMachines/GetExpMachines/${this.token.getToken()}/${this.server.getServerID()}`
    );
  }

  updateExpMachine(expMachine: any): Observable<any> {
    return this.http.put<any>(
      `http://hcs.dev4.com.br/api/ExpMachines/EditExpMachine/${this.token.getToken()}/${expMachine.id}`,
      expMachine
    );
  }
}
