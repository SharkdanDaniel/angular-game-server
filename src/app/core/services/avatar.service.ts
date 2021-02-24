import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ServersService } from './servers.service';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(
    private http: HttpClient,
    private token: TokenService,
    private server: ServersService
  ) {}

  getAvatars(): Observable<any[]> {
    return this.http.get<any[]>(
      `https://hcs.dev4.com.br/api/Avatar/ListAvatars/${this.token.getToken()}/${this.server.getServerID()}`
    ).pipe(take(1));
  }

  updateAvatar(avatar: any): Observable<any> {
    return this.http.put<any>(
      `https://hcs.dev4.com.br/api/Avatar/EditAvatar/${this.token.getToken()}/${
        avatar.uuid
      }`,
      avatar
    ).pipe(take(1));
  }

  banAvatar(avatar: any, reason: string): Observable<any> {
    return this.http.put<any>(
      `https://hcs.dev4.com.br/api/Avatar/BanAvatar/${this.token.getToken()}/${avatar.uuid}/${reason}`,
      avatar
    ).pipe(take(1));
  }

  unbanAvatar(avatar: any): Observable<any> {
    return this.http.put<any>(
      `https://hcs.dev4.com.br/api/Avatar/UnbanAvatar/${this.token.getToken()}/${avatar.uuid}`,
      avatar
    ).pipe(take(1));
  }
}
