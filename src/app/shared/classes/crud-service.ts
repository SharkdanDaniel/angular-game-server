import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, take, delay } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';

export class CrudService<T> {
  protected getAll_URL: string;
  protected getById_URL: string;
  protected update_URL: string;
  protected create_URL: string;
  protected delete_URL: string;


  constructor(
    protected http: HttpClient,
    private API_URL,
    protected snackBar: SnackbarService,
    private nxgSpinner: NgxSpinnerService
  ) {}

  getAll() {
    return this.http.get<T[]>(`${this.API_URL}${this.getAll_URL}`).pipe(
      take(1),
      // catchError((err) => {
      //   console.log(err);
      //   this.handleError();
      //   this.nxgSpinner.hide();
      //   this.nxgSpinner.hide('content');
      //   return EMPTY;
      // })
    );
  }

  getById(id) {
    return this.http.get(`${this.API_URL}${this.getById_URL}/${id}`).pipe(
      take(1),
      // catchError((err) => {
      //   console.log(err);
      //   this.handleError();
      //   this.nxgSpinner.hide();
      //   this.nxgSpinner.hide('content');
      //   return EMPTY;
      // })
    );
  }

  create(data: T) {
    this.nxgSpinner.show('content');
    return this.http.post(`${this.API_URL}${this.create_URL}`, data).pipe(
      take(1),
      // catchError((err) => {
      //   console.log(err);
      //   this.handleError();
      //   this.nxgSpinner.hide();
      //   this.nxgSpinner.hide('content');
      //   return EMPTY;
      // })
    );
  }

  update(data: T) {
    this.nxgSpinner.show('content');
    return this.http.put(`${this.API_URL}${this.update_URL}/${data['id']}`, data).pipe(
      take(1),
      // catchError((err) => {
      //   console.log(err);
      //   this.handleError();
      //   this.nxgSpinner.hide();
      //   this.nxgSpinner.hide('content');
      //   return EMPTY;
      // })
    );
  }

  delete(id) {
    this.nxgSpinner.show('content');
    return this.http.delete(`${this.API_URL}${this.delete_URL}/${id}`).pipe(
      take(1),
      // catchError((err) => {
      //   console.log(err);
      //   this.handleError();
      //   this.nxgSpinner.hide();
      //   this.nxgSpinner.hide('content');
      //   return EMPTY;
      // })
    );
  }

  handleError() {
    this.snackBar.showMessage('Erro ao conectar com o servidor', true);
  }
}
