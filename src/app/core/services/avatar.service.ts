import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/shared/classes/crud-service';
import { Avatar } from './../models/avatar';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AvatarService extends CrudService<Avatar> {
  constructor(
    protected injector: Injector,
  ) {
    super(injector);
    this.setGetAll = `Avatar/ListAvatars/${this.tokenService.getToken()}/${this.loginService.getServer().id}`;
    this.setUpdate = `Avatar/EditAvatar/${this.tokenService.getToken()}`;
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
