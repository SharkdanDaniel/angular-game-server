import { Observable } from 'rxjs';
import { ServersService } from './servers.service';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private server: ServersService
  ) { }

  getDiseases(): Observable<any> {
    return this.http.get<any>(
      `http://hcs.dev4.com.br/api/Disease/ListServerWithDiseases/${this.token.getToken()}/${this.server.getServerID()}`
    );
  }

  createDisease(disease: any): Observable<any> {
    return this.http.post<any>(
      `http://hcs.dev4.com.br/api/Disease/AddDiseaseToServer/${this.token.getToken()}/${this.server.getServerID()}`,
      disease
    );
  }

  updateDisease(disease: any): Observable<any> {
    return this.http.put<any>(
      `http://hcs.dev4.com.br/api/Disease/EditDiseaseFromServer/${this.token.getToken()}/${disease.id}`,
      disease
    );
  }

  deleteDisease(id: string): Observable<any> {
    return this.http.delete<any>(
      `http://hcs.dev4.com.br/api/Disease/RemoveDiseaseFromServer/${this.token.getToken()}/${this.server.getServerID()}/${id}`
    );
  }
}
