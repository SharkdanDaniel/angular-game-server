import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CrudService } from 'src/app/shared/classes/crud-service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ServersService } from './servers.service';
import { TokenService } from './token.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpMachinesService extends CrudService<any> {
  constructor(
    protected injector: Injector,
    protected tokenService: TokenService,
    private server: ServersService,
    protected snackBar: SnackbarService,
  ) {
    super(snackBar, injector, tokenService);
    this.setGetAll = `ExpMachines/GetExpMachines/${this.token}/${this.server.getServerID()}`;
    this.setUpdate = `ExpMachines/EditExpMachine/${this.token}`;
  }

  // getExpMachines(): Observable<any[]> {
  //   return this.http.get<any[]>(
  //     `https://hcs.dev4.com.br/api/ExpMachines/GetExpMachines/${this.token.getToken()}/${this.server.getServerID()}`
  //   ).pipe(take(1));
  // }

  // updateExpMachine(expMachine: any): Observable<any> {
  //   return this.http.put<any>(
  //     `https://hcs.dev4.com.br/api/ExpMachines/EditExpMachine/${this.token.getToken()}/${expMachine.id}`,
  //     expMachine
  //   ).pipe(take(1));
  // }
}
