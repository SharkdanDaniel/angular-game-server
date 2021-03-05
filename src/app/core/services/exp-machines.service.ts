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
  ) {
    super(injector);
    this.setGetAll = `ExpMachines/GetExpMachines/${this.tokenService.getToken()}/${this.loginService.getServer().id}`;
    this.setUpdate = `ExpMachines/EditExpMachine/${this.tokenService.getToken()}`;
  }
}
