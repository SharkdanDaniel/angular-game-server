import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CrudService } from 'src/app/shared/classes/crud-service';
import { Avatar } from './../models/avatar';
import { ServersService } from './servers.service';
import { TokenService } from './token.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AvatarService extends CrudService<Avatar> {
  constructor(
    protected injector: Injector,
    protected tokenService: TokenService,
    private server: ServersService,
    protected snackBar: SnackbarService,
  ) {
    super(snackBar, injector, tokenService);
    this.setGetAll = `Avatar/ListAvatars/${this.token}/${this.server.getServerID()}`;
    this.setUpdate = `Avatar/EditAvatar/${this.token}`;
  }

  banAvatar(avatar: any, reason: string): Observable<any> {
    return this.http.put<any>(
      `https://hcs.dev4.com.br/api/Avatar/BanAvatar/${this.tokenService.getToken()}/${avatar.uuid}/${reason}`,
      avatar
    ).pipe(take(1));
  }

  unbanAvatar(avatar: any): Observable<any> {
    return this.http.put<any>(
      `https://hcs.dev4.com.br/api/Avatar/UnbanAvatar/${this.tokenService.getToken()}/${avatar.uuid}`,
      avatar
    ).pipe(take(1));
  }
}
