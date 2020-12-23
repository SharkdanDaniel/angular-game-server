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
      `http://hcs.dev4.com.br/api/Avatar/ListAvatars/${this.token.getToken()}/${this.server.getServerID()}`
    );
  }

  updateAvatar(avatar: any): Observable<any> {
    return this.http.put<any>(
      `http://hcs.dev4.com.br/api/Avatar/EditAvatar/${this.token.getToken()}/${
        avatar.uuid
      }`,
      avatar
    );
  }

  banAvatar(avatar: any, reason: string): Observable<any> {
    return this.http.put<any>(
      `http://hcs.dev4.com.br/api/Avatar/BanAvatar/${this.token.getToken()}/${avatar.uuid}/${reason}`,
      avatar
    );
  }

  unbanAvatar(avatar: any): Observable<any> {
    return this.http.put<any>(
      `http://hcs.dev4.com.br/api/Avatar/UnbanAvatar/${this.token.getToken()}/${avatar.uuid}`,
      avatar
    );
  }
}
